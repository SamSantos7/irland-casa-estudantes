
import { AlertTriangle, ArrowUpRight, Calendar, FileText, MessageSquare, PiggyBank, User, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendValue?: string;
  trendUp?: boolean;
  className?: string;
}

const StatCard = ({ title, value, icon, trend, trendValue, trendUp, className }: StatCardProps) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className="mt-1 text-xs flex items-center">
          <span className={trendUp ? "text-green-500" : "text-red-500"}>
            {trendValue}
          </span>
          <span className="text-muted-foreground ml-1">{trend}</span>
        </p>
      )}
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Filtrar por data
          </Button>
          <Button variant="default" size="sm">
            Atualizar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total de Reservas (Mês)" 
          value="28"
          icon={<Calendar className="h-5 w-5 text-primary" />}
          trend="desde o último mês"
          trendValue="+12%"
          trendUp={true}
        />
        
        <StatCard 
          title="Reservas Pendentes" 
          value="7"
          icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
        />
        
        <StatCard 
          title="Documentos Pendentes" 
          value="15"
          icon={<FileText className="h-5 w-5 text-blue-500" />}
        />
        
        <StatCard 
          title="Pagamentos Pendentes" 
          value="€4.890"
          icon={<PiggyBank className="h-5 w-5 text-green-500" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Clientes Recentes</CardTitle>
              <Button variant="outline" size="sm">Ver todos</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium">Cliente {i}</p>
                      <p className="text-sm text-muted-foreground">cliente{i}@example.com</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Mensagens Recentes</CardTitle>
              <Button variant="outline" size="sm">Ver todas</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start justify-between">
                  <div className="flex items-start gap-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mt-1">
                      <MessageSquare className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium">Cliente {i}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        Olá, gostaria de saber mais sobre acomodação em Dublin...
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {i === 1 ? 'Agora' : i === 2 ? '5min' : i === 3 ? '1h' : i === 4 ? '4h' : '1d'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
