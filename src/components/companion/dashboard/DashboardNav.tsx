import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Image,
  UserCheck,
  Crown,
  BarChart,
  Settings,
} from "lucide-react";

const navItems = [
  {
    title: "Mídia",
    href: "/painel/midia",
    icon: Image,
  },
  {
    title: "Verificação",
    href: "/painel/verificacao",
    icon: UserCheck,
  },
  {
    title: "Assinatura",
    href: "/painel/assinatura",
    icon: Crown,
  },
  {
    title: "Analytics",
    href: "/painel/analytics",
    icon: BarChart,
  },
  {
    title: "Configurações",
    href: "/painel/configuracoes",
    icon: Settings,
  },
];

export const DashboardNav = () => {
  const location = useLocation();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};