import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  TrendingUp,
  Users,
  Wallet,
  Clock,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import api from "@/lib/api";
import { formatMoney, formatMoneyCompact, formatMonth, formatDate } from "@/lib/format";
import { PageHeader, StatCard, ChartCard, StatusBadge, EmptyState } from "../components/widgets";
import { cn } from "@/lib/utils";

const useApi = (key, url, params) =>
  useQuery({
    queryKey: [key, params],
    queryFn: async () => (await api.get(url, { params })).data,
  });

const chartTooltip = {
  contentStyle: {
    background: "rgba(10,10,10,0.95)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12,
    fontSize: 12,
  },
  labelStyle: { color: "rgba(255,255,255,0.6)" },
  itemStyle: { color: "#fff" },
};

const PIE_COLORS = ["#ffffff", "#a3a3a3", "#525252"];
const STATUS_COLORS = { active: "#34d399", lead: "#38bdf8", paused: "#fbbf24", churned: "#525252" };

export default function Dashboard() {
  const [granularity, setGranularity] = useState("month");

  const { data: summary } = useApi("summary", "/dashboard/summary");
  const { data: revenue = [] } = useApi("revenue", "/dashboard/revenue", { granularity, months: 12 });
  const { data: mrrTrend = [] } = useApi("mrr", "/dashboard/mrr-trend", { months: 12 });
  const { data: breakdown = {} } = useApi("breakdown", "/dashboard/clients/breakdown");
  const { data: upcoming = [] } = useApi("upcoming", "/dashboard/payments/upcoming", { days: 14 });
  const { data: overdue = [] } = useApi("overdue", "/dashboard/payments/overdue");

  const s = summary || {};
  const revData = revenue.map((r) => ({ ...r, label: formatMonth(r.period), totalD: r.total / 100 }));
  const mrrData = mrrTrend.map((r) => ({ label: formatMonth(r.period), mrr: r.mrr / 100 }));
  const splitData = [
    { name: "Deposits", value: (s.deposits_collected || 0) / 100 },
    { name: "Recurring", value: (s.recurring_collected || 0) / 100 },
  ];
  const statusData = Object.entries(breakdown).map(([name, value]) => ({ name, value }));

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Revenue, recurring income and client health at a glance" />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard index={0} label="MRR" value={formatMoneyCompact(s.mrr)} sub={`${s.active_clients ?? 0} active clients`} icon={TrendingUp} accent="green" />
        <StatCard index={1} label="Collected (mo)" value={formatMoneyCompact(s.collected_this_month)} sub="this month" icon={Wallet} accent="blue" />
        <StatCard index={2} label="Total collected" value={formatMoneyCompact(s.total_collected)} sub="all time" icon={ArrowUpRight} />
        <StatCard index={3} label="Outstanding" value={formatMoneyCompact(s.outstanding)} sub="pending" icon={Clock} accent="amber" />
        <StatCard index={4} label="Overdue" value={formatMoneyCompact(s.overdue_total)} sub={`${s.overdue_count ?? 0} payments`} icon={AlertTriangle} accent="red" />
      </div>

      {/* Revenue + MRR */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <ChartCard
          title="Revenue over time"
          className="lg:col-span-2"
          action={
            <div className="flex rounded-lg border border-white/10 p-0.5">
              {["week", "month", "year"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGranularity(g)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors",
                    granularity === g ? "bg-white text-black" : "text-white/50 hover:text-white"
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          }
        >
          {revData.length === 0 ? (
            <EmptyState title="No revenue yet" hint="Paid payments will appear here" icon={TrendingUp} />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revData} margin={{ left: -16, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="label" stroke="rgba(255,255,255,0.35)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.35)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `£${v}`} />
                <Tooltip {...chartTooltip} formatter={(v) => [`£${Number(v).toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="totalD" stroke="#fff" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title="MRR trend">
          {mrrData.every((d) => d.mrr === 0) ? (
            <EmptyState title="No subscriptions yet" hint="Start a subscription to track MRR" icon={TrendingUp} />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={mrrData} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="label" stroke="rgba(255,255,255,0.35)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.35)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `£${v}`} />
                <Tooltip {...chartTooltip} formatter={(v) => [`£${Number(v).toLocaleString()}`, "MRR"]} />
                <Line type="monotone" dataKey="mrr" stroke="#34d399" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Split + status + lists */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <ChartCard title="Deposits vs recurring">
          {splitData.every((d) => d.value === 0) ? (
            <EmptyState title="No revenue split yet" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={splitData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {splitData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip {...chartTooltip} formatter={(v, n) => [`£${Number(v).toLocaleString()}`, n]} />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="mt-2 flex justify-center gap-4 text-xs text-white/50">
            {splitData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                {d.name}
              </span>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Clients by status">
          {statusData.length === 0 ? (
            <EmptyState title="No clients yet" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={statusData} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.35)" fontSize={11} tickLine={false} axisLine={false} className="capitalize" />
                <YAxis stroke="rgba(255,255,255,0.35)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip {...chartTooltip} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {statusData.map((d, i) => (
                    <Cell key={i} fill={STATUS_COLORS[d.name] || "#fff"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard
          title={`Overdue (${overdue.length})`}
          action={<Link to="/admin/payments" className="text-xs text-white/40 hover:text-white">View all</Link>}
        >
          {overdue.length === 0 ? (
            <EmptyState title="Nothing overdue" hint="You're all caught up" icon={Clock} />
          ) : (
            <ul className="space-y-2">
              {overdue.slice(0, 6).map((p) => (
                <PaymentRow key={p.id} p={p} />
              ))}
            </ul>
          )}
        </ChartCard>
      </div>

      {/* Upcoming */}
      <div className="mt-5">
        <ChartCard title={`Upcoming payments (next 14 days)`}>
          {upcoming.length === 0 ? (
            <EmptyState title="No upcoming payments" icon={Clock} />
          ) : (
            <ul className="divide-y divide-white/5">
              {upcoming.map((p) => (
                <li key={p.id} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-white/30" />
                    <Link to={`/admin/clients/${p.client_id}`} className="text-sm hover:underline">
                      {p.client_name || "Client"}
                    </Link>
                    <span className="text-xs capitalize text-white/40">{p.type}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-white/45">{formatDate(p.due_date)}</span>
                    <span className="text-sm font-medium">{formatMoney(p.amount, p.currency)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ChartCard>
      </div>
    </div>
  );
}

function PaymentRow({ p }) {
  return (
    <li className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2">
      <Link to={`/admin/clients/${p.client_id}`} className="text-sm hover:underline">
        {p.client_name || "Client"}
      </Link>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{formatMoney(p.amount, p.currency)}</span>
        <StatusBadge status="overdue" />
      </div>
    </li>
  );
}
