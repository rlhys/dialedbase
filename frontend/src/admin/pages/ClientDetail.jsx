import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft, Loader2, Link2, UserPlus, Repeat, XCircle, Copy, Plus, Check, Mail, Phone, Building2, Trash2,
} from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { formatMoney, formatDate, dollarsToCents, centsToDollars } from "@/lib/format";
import { PageHeader, StatusBadge, EmptyState, ChartCard } from "../components/widgets";
import { cn } from "@/lib/utils";

export default function ClientDetail() {
  const { id } = useParams();
  const qc = useQueryClient();
  const [addPay, setAddPay] = useState(false);

  const { data: client, isLoading } = useQuery({
    queryKey: ["client", id],
    queryFn: async () => (await api.get(`/clients/${id}`)).data,
  });
  const { data: payments = [] } = useQuery({
    queryKey: ["client-payments", id],
    queryFn: async () => (await api.get(`/clients/${id}/payments`)).data,
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["client", id] });
    qc.invalidateQueries({ queryKey: ["client-payments", id] });
  };

  const action = useMutation({
    mutationFn: async ({ url, body }) => (await api.post(url, body || {})).data,
    onSuccess: (data, vars) => {
      invalidate();
      if (vars.onDone) vars.onDone(data);
      else toast.success("Done");
    },
    onError: (e) => toast.error(e?.response?.data?.detail || "Action failed"),
  });

  const cancelPayment = useMutation({
    mutationFn: async (pid) => (await api.delete(`/payments/${pid}`)).data,
    onSuccess: () => { invalidate(); toast.success("Payment cancelled"); },
    onError: (e) => toast.error(e?.response?.data?.detail || "Couldn't cancel payment"),
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin opacity-50" /></div>;
  if (!client) return <EmptyState title="Client not found" />;

  return (
    <div>
      <Link to="/admin/clients" className="mb-4 inline-flex items-center gap-1.5 text-sm text-white/45 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Clients
      </Link>

      <PageHeader title={client.name} subtitle={client.project_description || client.company}>
        <StatusBadge status={client.status} />
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Info + Square */}
        <div className="space-y-5">
          <ChartCard title="Details">
            <dl className="space-y-3 text-sm">
              <Info icon={Mail} label="Email" value={client.email} />
              <Info icon={Phone} label="Phone" value={client.phone || "—"} />
              <Info icon={Building2} label="Company" value={client.company || "—"} />
              <div className="flex justify-between border-t border-white/5 pt-3"><span className="text-white/45">Full price</span><span>{formatMoney(client.total_amount, client.currency)}</span></div>
              <div className="flex justify-between"><span className="text-white/45">Deposit</span><span>{formatMoney(client.deposit_amount, client.currency)}</span></div>
              <div className="flex justify-between"><span className="text-white/45">Balance</span><span>{formatMoney(Math.max(0, (client.total_amount || 0) - (client.deposit_amount || 0)), client.currency)}</span></div>
              <div className="flex justify-between"><span className="text-white/45">Monthly</span><span>{formatMoney(client.monthly_recurring_amount, client.currency)}/mo</span></div>
              <div className="flex justify-between"><span className="text-white/45">Outstanding</span><span className={client.overdue_count > 0 ? "text-rose-300" : ""}>{formatMoney(client.outstanding_balance, client.currency)}</span></div>
              <div className="flex justify-between"><span className="text-white/45">Paid to date</span><span className="text-emerald-300">{formatMoney(client.paid_total, client.currency)}</span></div>
            </dl>
            {client.notes && <p className="mt-4 rounded-lg bg-white/[0.03] p-3 text-xs text-white/55">{client.notes}</p>}
          </ChartCard>

          <ChartCard title="Square">
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/45">Customer</span>
                {client.square_customer_id ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-300"><Check className="h-3.5 w-3.5" /> linked</span>
                ) : (
                  <button
                    onClick={() => action.mutate({ url: `/square/clients/${id}/customer`, onDone: () => toast.success("Square customer created") })}
                    disabled={action.isPending}
                    className="flex items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1 text-xs hover:bg-white/5"
                  >
                    <UserPlus className="h-3.5 w-3.5" /> Create
                  </button>
                )}
              </div>

              <button
                onClick={() =>
                  action.mutate({
                    url: `/square/clients/${id}/deposit-link`,
                    onDone: (d) => {
                      if (d.url) { navigator.clipboard?.writeText(d.url); toast.success("Deposit link copied to clipboard"); }
                    },
                  })
                }
                disabled={action.isPending || !client.deposit_amount}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 py-2 text-sm font-medium hover:bg-white/15 disabled:opacity-50"
              >
                <Link2 className="h-4 w-4" /> Create deposit link
              </button>

              <button
                onClick={() =>
                  action.mutate({
                    url: `/square/clients/${id}/final-link`,
                    onDone: (d) => {
                      if (d.url) { navigator.clipboard?.writeText(d.url); toast.success("Final payment link copied"); }
                    },
                  })
                }
                disabled={action.isPending || !client.total_amount || (client.total_amount - client.deposit_amount) <= 0}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 py-2 text-sm font-medium hover:bg-white/15 disabled:opacity-50"
              >
                <Link2 className="h-4 w-4" /> Create final payment link
              </button>

              {client.square_subscription_id ? (
                <button
                  onClick={() => toast("Cancel from the Payments view of the subscription")}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-rose-500/30 py-2 text-sm text-rose-300 hover:bg-rose-500/10"
                >
                  <XCircle className="h-4 w-4" /> Subscription active
                </button>
              ) : (
                <button
                  onClick={() =>
                    action.mutate({
                      url: `/square/clients/${id}/save-card-link`,
                      onDone: (d) => {
                        if (d.url) { navigator.clipboard?.writeText(d.url); toast.success("Subscription link copied — send it to your client"); }
                      },
                    })
                  }
                  disabled={action.isPending || !client.monthly_recurring_amount}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 py-2 text-sm font-medium hover:bg-white/15 disabled:opacity-50"
                >
                  <Repeat className="h-4 w-4" /> Create subscription link
                </button>
              )}
              <p className="text-[11px] leading-relaxed text-white/35">
                Sends the client a secure link to add their card once. After that, their monthly plan auto-charges every month — nothing more for you to do.
              </p>
            </div>
          </ChartCard>
        </div>

        {/* Payments */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Payment history"
            action={
              <button onClick={() => setAddPay(true)} className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white">
                <Plus className="h-3.5 w-3.5" /> Add payment
              </button>
            }
          >
            {payments.length === 0 ? (
              <EmptyState title="No payments yet" hint="Create a deposit link or add a manual payment" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/40">
                      <th className="py-2.5 pr-3 font-medium">Type</th>
                      <th className="px-3 py-2.5 font-medium">Due</th>
                      <th className="px-3 py-2.5 font-medium text-right">Amount</th>
                      <th className="px-3 py-2.5 font-medium">Status</th>
                      <th className="py-2.5" />
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.id} className="border-b border-white/5">
                        <td className="py-2.5 pr-3 capitalize">{p.type}</td>
                        <td className="px-3 py-2.5 text-white/60">{formatDate(p.due_date)}</td>
                        <td className="px-3 py-2.5 text-right">{formatMoney(p.amount, p.currency)}</td>
                        <td className="px-3 py-2.5"><StatusBadge status={p.overdue ? "overdue" : p.status} /></td>
                        <td className="py-2.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {p.square_payment_link_url && (
                              <button onClick={() => { navigator.clipboard?.writeText(p.square_payment_link_url); toast.success("Link copied"); }} className="text-white/40 hover:text-white">
                                <Copy className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {p.status !== "paid" && (
                              <button
                                onClick={() => action.mutate({ url: `/payments/${p.id}/mark-paid`, onDone: () => toast.success("Marked paid") })}
                                className="rounded-md border border-white/15 px-2 py-0.5 text-xs hover:bg-white/5"
                              >
                                Mark paid
                              </button>
                            )}
                            <button
                              title="Cancel payment"
                              onClick={() => {
                                if (window.confirm("Cancel this payment? It will be removed from the client's record.")) cancelPayment.mutate(p.id);
                              }}
                              className="text-white/40 transition-colors hover:text-rose-300"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </ChartCard>
        </div>
      </div>

      {addPay && <AddPaymentDialog clientId={id} defaultMonthly={centsToDollars(client.monthly_recurring_amount)} onClose={() => setAddPay(false)} onDone={invalidate} />}
    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-white/45"><Icon className="h-3.5 w-3.5" /> {label}</span>
      <span className="truncate pl-3 text-right">{value}</span>
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm outline-none focus:border-white/30";

function AddPaymentDialog({ clientId, defaultMonthly, onClose, onDone }) {
  const qc = useQueryClient();
  const [type, setType] = useState("recurring");
  const [amount, setAmount] = useState(defaultMonthly || "");
  const [due, setDue] = useState(() => new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState("pending");

  const create = useMutation({
    mutationFn: async (body) => (await api.post("/payments", body)).data,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["client-payments", clientId] }); onDone(); onClose(); toast.success("Payment added"); },
    onError: (e) => toast.error(e?.response?.data?.detail || "Failed"),
  });

  const submit = (e) => {
    e.preventDefault();
    create.mutate({
      client_id: clientId,
      type,
      amount: dollarsToCents(amount),
      status,
      due_date: new Date(due).toISOString(),
      paid_at: status === "paid" ? new Date().toISOString() : null,
      source: "manual",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={submit} className="glass-strong w-full max-w-sm space-y-4 rounded-3xl p-6">
        <h2 className="text-lg font-semibold">Add payment</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs text-white/60">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className={cn(inputCls, "capitalize")}>
              <option value="deposit" className="bg-neutral-900">deposit</option>
              <option value="recurring" className="bg-neutral-900">recurring</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-white/60">Amount (£)</label>
            <input type="number" min="0" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-white/60">Due date</label>
            <input type="date" required value={due} onChange={(e) => setDue(e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-white/60">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={cn(inputCls, "capitalize")}>
              <option value="pending" className="bg-neutral-900">pending</option>
              <option value="paid" className="bg-neutral-900">paid</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/70 hover:bg-white/5">Cancel</button>
          <button type="submit" disabled={create.isPending} className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-60">
            {create.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Add
          </button>
        </div>
      </form>
    </div>
  );
}
