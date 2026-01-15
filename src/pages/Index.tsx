import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEmployees, EmployeeData } from "@/data/employees";
import { useState } from "react";
import { DashboardCharts } from "@/components/DashboardCharts";
import { Users, MapPin, DollarSign, Building } from "lucide-react";

const Index = () => {
  // Using mock data for demonstration
  const [employees] = useState<EmployeeData[]>(mockEmployees);

  // Calculate summary statistics
  const totalEmployees = employees.length;
  const totalNuclei = new Set(employees.map(e => e.nucleusNumber)).size;
  const totalCities = new Set(employees.map(e => e.city)).size;
  
  // Simple mock calculation for total value (R$ 11.500,00 based on mock data)
  const totalValue = employees.reduce((sum, e) => {
    const valueStr = e.value.replace('R$', '').replace('.', '').replace(',', '.').trim();
    const valueNum = parseFloat(valueStr) || 0;
    return sum + valueNum;
  }, 0);
  
  const formattedTotalValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalValue);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard de RH</h1>
        
        {/* Overview Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Funcionários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmployees}</div>
              <p className="text-xs text-muted-foreground">Registros ativos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Núcleos</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalNuclei}</div>
              <p className="text-xs text-muted-foreground">Núcleos cadastrados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cidades Ativas</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCities}</div>
              <p className="text-xs text-muted-foreground">Cidades com núcleos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total (Mensal)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formattedTotalValue}</div>
              <p className="text-xs text-muted-foreground">Estimativa salarial</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Section */}
        <DashboardCharts employees={employees} />
      </div>
    </Layout>
  );
};

export default Index;