import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Users, Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { formatMoney, centsToDollars, dollarsToCents } from "@/lib/format";
import { PageHeader, StatusBadge, EmptyState } from "../components/widgets";
import { cn } from "@/lib/utils";

const STATUSES = ["lead", "active", "paused", "churned"];
const empty = {
  name: "", company: "", email: "", phone: "", status: "lead",
  project_description: "", notes: "", deposit_amount: "", monthly_recurring_amount: "",
};

export default function Clients() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dialog, setDialog] = useState(null); // null | {mode, client}

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ["clients", search, statusFilter],
    queryFn: async () =>
      (await api.get("/clients", { params: { search: search || undefined, status: statusFilter || undefined } })).data,
  });

  const save = useMutation({
    mutationFn: async ({ mode, id, body }) =>
      mode === "edit" ? (await api.patch(`/clients/${id}`, body)).data : (await api.post("/clients", body)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clients"] });
      setDialog(null);
      toast.success("Client saved");
    },
    onError: (e) => toast.error(e?.response?.data?.detail || "Save failed"),
  });

  return (
    <div>
      <PageHeader title="Clients" subtitle={`${clients.length} client${clients.length === 1 ? "" : "s"}`}>
        <button
          onClick={() => setDialog({ mode: "create", client: empty })}
          className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Add client
        </button>
      </PageHeader>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, company, email…"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-white/30 focus:border-white/30"
          />
        </div>
        <div className="flex rounded-xl border border-white/10 p-0.5">
          {["", ...STATUSES].map((st) => (
            <button
              key={st || "all"}
              onClick={() => setStatusFilter(st)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                statusFilter === st ? "bg-white text-black" : "text-white/50 hover:text-white"
              )}
            >
              {st || "all"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden rounded-2xl">
        {isLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-5 w-5 animate-spin opacity-50" /></div>
        ) : clients.length === 0 ? (
          <EmptyState icon={Users} title="No clients yet" hint="Add your first client to get started" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/40">
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Deposit</th>
                  <th className="px-5 py-3 font-medium text-right">Monthly</th>
                  <th className="px-5 py-3 font-medium text-right">Outstanding</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id} className="group border-b border-white/5 transition-colors hover:bg-white/[0.03]">
                    <td className="px-5 py-3">
                      <Link to={`/admin/clients/${c.id}`} className="font-medium hover:underline">{c.name}</Link>
                      <div className="text-xs text-white/40">{c.company || c.email}</div>
                    </td>
                    <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-5 py-3 text-right">{formatMoney(c.deposit_amount, c.currency)}</td>
                    <td className="px-5 py-3 text-right">{formatMoney(c.monthly_recurring_amount, c.currency)}/mo</td>
                    <td className="px-5 py-3 text-right">
                      <span className={c.overdue_count > 0 ? "text-rose-300" : ""}>
                        {formatMoney(c.outstanding_balance, c.currency)}
                      </span>
                      {c.overdue_count > 0 && <span className="ml-1 text-xs text-rose-400">({c.overdue_count} overdue)</span>}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => setDialog({ mode: "edit", client: c })}
                        className="opacity-0 transition-opacity group-hover:opacity-100 text-white/50 hover:text-white"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {dialog && (
        <ClientDialog
          mode={dialog.mode}
          client={dialog.client}
          saving={save.isPending}
          onClose={() => setDialog(null)}
          onSubmit={(body) =>
            save.mutate({ mode: dialog.mode, id: dialog.client.id, body })
          }
        />
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/60">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm outline-none placeholder:text-white/30 focus:border-white/30";

function ClientDialog({ mode, client, onClose, onSubmit, saving }) {
  const [form, setForm] = useState({
    name: client.name || "",
    company: client.company || "",
    email: client.email || "",
    phone: client.phone || "",
    status: client.status || "lead",
    project_description: client.project_description || "",
    notes: client.notes || "",
    deposit_amount: client.deposit_amount != null ? centsToDollars(client.deposit_amount) : "",
    monthly_recurring_amount:
      client.monthly_recurring_amount != null ? centsToDollars(client.monthly_recurring_amount) : "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      name: form.name,
      company: form.company || null,
      email: form.email,
      phone: form.phone || null,
      status: form.status,
      project_description: form.project_description || null,
      notes: form.notes || null,
      deposit_amount: dollarsToCents(form.deposit_amount),
      monthly_recurring_amount: dollarsToCents(form.monthly_recurring_amount),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="glass-strong max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-5 text-lg font-semibold">{mode === "edit" ? "Edit client" : "Add client"}</h2>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name"><input required value={form.name} onChange={set("name")} className={inputCls} /></Field>
            <Field label="Company"><input value={form.company} onChange={set("company")} className={inputCls} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email"><input type="email" required value={form.email} onChange={set("email")} className={inputCls} /></Field>
            <Field label="Phone"><input value={form.phone} onChange={set("phone")} className={inputCls} /></Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Status">
              <select value={form.status} onChange={set("status")} className={cn(inputCls, "capitalize")}>
                {STATUSES.map((s) => <option key={s} value={s} className="bg-neutral-900">{s}</option>)}
              </select>
            </Field>
            <Field label="Deposit (£)"><input type="number" min="0" step="0.01" value={form.deposit_amount} onChange={set("deposit_amount")} className={inputCls} /></Field>
            <Field label="Monthly (£)"><input type="number" min="0" step="0.01" value={form.monthly_recurring_amount} onChange={set("monthly_recurring_amount")} className={inputCls} /></Field>
          </div>
          <Field label="Project"><input value={form.project_description} onChange={set("project_description")} className={inputCls} placeholder="What you're building for them" /></Field>
          <Field label="Notes"><textarea rows={3} value={form.notes} onChange={set("notes")} className={inputCls} /></Field>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/70 hover:bg-white/5">Cancel</button>
            <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-60">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
