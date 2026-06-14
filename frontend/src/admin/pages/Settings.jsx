import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { PageHeader, ChartCard } from "../components/widgets";

const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm outline-none focus:border-white/30";

export default function Settings() {
  const qc = useQueryClient();
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => (await api.get("/settings")).data,
  });
  const { data: health, isFetching: checking, refetch } = useQuery({
    queryKey: ["square-health"],
    queryFn: async () => (await api.get("/square/health")).data,
  });

  const [form, setForm] = useState({ business_name: "", default_currency: "USD", upcoming_window_days: 7 });
  useEffect(() => {
    if (settings) setForm({
      business_name: settings.business_name || "",
      default_currency: settings.default_currency || "USD",
      upcoming_window_days: settings.upcoming_window_days ?? 7,
    });
  }, [settings]);

  const save = useMutation({
    mutationFn: async (body) => (await api.patch("/settings", body)).data,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["settings"] }); toast.success("Settings saved"); },
    onError: () => toast.error("Save failed"),
  });

  const ok = health?.ok;

  return (
    <div>
      <PageHeader title="Settings" subtitle="Business defaults and integrations" />

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Business">
          <form
            onSubmit={(e) => { e.preventDefault(); save.mutate({ ...form, upcoming_window_days: Number(form.upcoming_window_days) }); }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <label className="text-xs text-white/60">Business name</label>
              <input value={form.business_name} onChange={(e) => setForm((f) => ({ ...f, business_name: e.target.value }))} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-white/60">Currency</label>
                <input value={form.default_currency} onChange={(e) => setForm((f) => ({ ...f, default_currency: e.target.value }))} className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-white/60">Upcoming window (days)</label>
                <input type="number" min="1" value={form.upcoming_window_days} onChange={(e) => setForm((f) => ({ ...f, upcoming_window_days: e.target.value }))} className={inputCls} />
              </div>
            </div>
            <button type="submit" disabled={save.isPending} className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-60">
              {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Save
            </button>
          </form>
        </ChartCard>

        <ChartCard
          title="Square connection"
          action={
            <button onClick={() => refetch()} className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white">
              <RefreshCw className={checking ? "h-3.5 w-3.5 animate-spin" : "h-3.5 w-3.5"} /> Re-check
            </button>
          }
        >
          <div className="flex items-center gap-3">
            {ok ? <CheckCircle2 className="h-8 w-8 text-emerald-400" /> : <XCircle className="h-8 w-8 text-rose-400" />}
            <div>
              <div className="font-medium">{ok ? "Connected" : "Not connected"}</div>
              <div className="text-xs text-white/45">
                {ok
                  ? `${health.environment} · ${health.location_name || health.location_id}`
                  : health?.detail || "Configure Square credentials in the backend .env"}
              </div>
            </div>
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-white/35">
            Set SQUARE_ACCESS_TOKEN, SQUARE_LOCATION_ID and SQUARE_WEBHOOK_SIGNATURE_KEY in the backend environment.
            Point the Square webhook to <code className="text-white/55">/_/backend/api/webhooks/square</code>.
          </p>
        </ChartCard>
      </div>
    </div>
  );
}
