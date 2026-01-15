import { Link } from "react-router-dom";
import { LayoutDashboard, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard & Relatórios",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Cadastro de Funcionário",
    href: "/cadastro",
    icon: UserPlus,
  },
];

export function SidebarNav() {
  const currentPath = window.location.pathname;

  return (
    <div className="flex flex-col space-y-1 p-4">
      <h2 className="mb-4 px-2 text-xl font-bold tracking-tight text-sidebar-primary">
        Sistema RH
      </h2>
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              currentPath === item.href
                ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
                : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              "justify-start text-sidebar-foreground",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}