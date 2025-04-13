
import { Bell, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/use-theme";

const AdminHeader = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center px-4 md:px-6">
      <div className="flex-1 flex items-center gap-x-4">
        <div className="relative max-w-md lg:max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            type="text"
            placeholder="Buscar..."
            className="pl-10 w-full md:w-80"
          />
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          aria-label="Notificações"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Alternar tema"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <div className="flex items-center gap-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="text-sm font-medium">A</span>
          </div>
          <span className="hidden md:inline text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
