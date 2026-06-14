import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreditCard, Loader2, Copy } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { formatMoney, formatDate } from "@/lib/format";
import { PageHeader, StatusBadge, EmptyState } from "../components/widgets";
import { cn } from "@/lib/utils";

const FILTERS = [
  { key: "", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "paid", label: "Paid" },
  { key: "overdue", label: "Overdue" },
  { key: "failed", label: "Failed" },
];

export default function Payments() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState("");

  const params = filter === "overdue" ? { overdue: true } : filter ? { status: filter } : {};
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", filter],
    queryFn: async () => (await api.get("/payments", { params })).data,
  });

  const markPaid = useMutation({
    mutationFn: async (pid) => (await api.post(`/payments/${pid}/mark-paid`)).data,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["payments"] }); toast.success("Marked paid"); },
    onError: () => toast.error("Failed"),
  });

  return (
    <div>
      <PageHeader title="Payments" subtitle="Every deposit and recurring charge" />

      <div className="mb-4 flex rounded-xl border border-white/10 p-0.5">
        {FILTERS.map((f) => (
          <button
            key={f.key || "all"}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
              filter === f.key ? "bg-white text-black" : "text-white/50 hover:text-white"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="glass overflow-hidden rounded-2xl">
        {isLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-5 w-5 animate-spin opacity-50" /></div>
        ) : payments.length === 0 ? (
          <EmptyState icon={CreditCard} title="No payments" hint="Payments will appear here as you bill clients" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/40">
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Due</th>
                  <th className="px-5 py-3 font-medium text-right">Amount</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.03]">
                    <td className="px-5 py-3">
                      <Link to={`/admin/clients/${p.client_id}`} className="hover:underline">{p.client_name || "Client"}</Link>
                    </td>
                    <td className="px-5 py-3 capitalize text-white/60">{p.type}</td>
                    <td className="px-5 py-3 text-white/60">{formatDate(p.due_date)}</td>
                    <td className="px-5 py-3 text-right">{formatMoney(p.amount, p.currency)}</td>
                    <td className="px-5 py-3"><StatusBadge status={p.overdue ? "overdue" : p.status} /></td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {p.square_payment_link_url && (
                          <button onClick={() => { navigator.clipboard?.writeText(p.square_payment_link_url); toast.success("Link copied"); }} className="text-white/40 hover:text-white">
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {p.status !== "paid" && (
                          <button onClick={() => markPaid.mutate(p.id)} className="rounded-md border border-white/15 px-2.5 py-1 text-xs hover:bg-white/5">
                            Mark paid
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
