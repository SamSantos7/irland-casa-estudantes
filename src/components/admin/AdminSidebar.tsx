
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  CalendarCheck, 
  Coins, 
  FileText, 
  Home, 
  Menu, 
  MessageSquare, 
  Settings, 
  UserCircle, 
  Users, 
  X 
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, href, active }: NavItemProps) => (
  <Link 
    to={href}
    className={cn(
      "flex items-center gap-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
      active 
        ? "bg-primary/10 text-primary" 
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    )}
  >
    <Icon className={cn("h-5 w-5", active ? "text-primary" : "text-gray-500 dark:text-gray-400")} />
    <span>{label}</span>
  </Link>
);

const AdminSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  
  const navigation = [
    { label: "Dashboard", href: "/admin", icon: BarChart3 },
    { label: "Reservas", href: "/admin/reservations", icon: CalendarCheck },
    { label: "Clientes", href: "/admin/clients", icon: UserCircle },
    { label: "Documentos", href: "/admin/documents", icon: FileText },
    { label: "Comunicação", href: "/admin/communication", icon: MessageSquare },
    { label: "Usuários", href: "/admin/users", icon: Users },
    { label: "Financeiro", href: "/admin/finance", icon: Coins },
    { label: "Acomodações", href: "/admin/accommodations", icon: Home },
  ];
  
  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="py-4 px-3.5">
        <Link to="/" className="flex items-center gap-x-3 text-xl font-semibold">
          <span className="text-primary">Irland</span>
          <span>Admin</span>
        </Link>
        
        <nav className="mt-8 space-y-1.5">
          {navigation.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={path === item.href || (item.href !== "/admin" && path.startsWith(item.href))}
            />
          ))}
        </nav>
      </div>
      
      <div className="mt-auto py-4 px-3.5">
        <NavItem
          icon={Settings}
          label="Configurações"
          href="/admin/settings"
          active={path === "/admin/settings"}
        />
        <div className="mt-6 px-3">
          <Button variant="outline" className="w-full">
            <span>Sair</span>
          </Button>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Mobile sidebar (drawer) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <Sidebar />
        </SheetContent>
      </Sheet>
      
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-72 border-r border-gray-200 dark:border-gray-800">
        <Sidebar />
      </aside>
    </>
  );
};

export default AdminSidebar;
