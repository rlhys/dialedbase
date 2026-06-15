import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/clients", label: "Clients", icon: Users },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-40" />
      <div className="relative flex min-h-screen">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-black/60 p-5 backdrop-blur-xl md:flex">
          <div className="mb-8 flex items-center gap-2 px-2">
            <Logo size="h-8 w-8" wordmark wordmarkClass="text-lg" />
            <span className="ml-1 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/60">
              admin
            </span>
          </div>

          <nav className="flex flex-1 flex-col gap-1">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/55 hover:bg-white/5 hover:text-white"
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto space-y-2 border-t border-white/10 pt-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 text-xs text-white/40 hover:text-white/70"
            >
              <ExternalLink className="h-3.5 w-3.5" /> View site
            </a>
            <div className="truncate px-3 text-xs text-white/40">{admin?.email}</div>
            <button
              data-testid="logout-button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/55 transition-colors hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl md:hidden">
            <Logo size="h-7 w-7" wordmark wordmarkClass="text-sm" />
            <button onClick={handleLogout} className="text-white/60">
              <LogOut className="h-5 w-5" />
            </button>
          </header>
          <nav className="flex gap-1 overflow-x-auto border-b border-white/10 bg-black/40 px-3 py-2 md:hidden">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm",
                    isActive ? "bg-white/10 text-white" : "text-white/55"
                  )
                }
              >
                <Icon className="h-4 w-4" /> {label}
              </NavLink>
            ))}
          </nav>

          <motion.main
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex-1 px-4 py-6 md:px-8 md:py-8"
          >
            <Outlet />
          </motion.main>
        </div>
      </div>
    </div>
  );
}
