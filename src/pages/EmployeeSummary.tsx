import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useEmployees } from "@/hooks/useEmployees";
import { User, MapPin, Briefcase, Phone, DollarSign, Building, Hash, Users } from "lucide-react";
import { FullWidthLayout } from "@/components/FullWidthLayout";

const EmployeeSummary = () => {
  const { id } = useParams();
  const { employees } = useEmployees();
  const navigate = useNavigate();
  
  const employee = employees.find(e => e.id === id);
  
  if (!employee) {
    return (
      <FullWidthLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">Funcionário não encontrado</h2>
          <Button onClick={() => navigate("/funcionarios")}>
            Voltar para lista
          </Button>
        </div>
      </FullWidthLayout>
    );
  }

  // Componente auxiliar para exibir um item de resumo
  const SummaryItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
      <div className="bg-primary/10 p-2 rounded-full">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );

  return (
    <FullWidthLayout>
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Resumo do Funcionário</h1>
          <Button onClick={() => navigate("/funcionarios")}>
            Voltar
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{employee.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SummaryItem icon={User} label="Nome" value={employee.name} />
              <SummaryItem icon={Briefcase} label="Função" value={employee.role} />
              <SummaryItem icon={DollarSign} label="Valor (Salário)" value={employee.value || 'N/A'} />
              <SummaryItem icon={Phone} label="Telefone Pessoal" value={employee.phone} />
              <SummaryItem icon={Hash} label="Nº Núcleo" value={employee.nucleusNumber} />
              <SummaryItem icon={Building} label="Núcleo" value={employee.nucleusName || 'N/A'} />
              <SummaryItem icon={MapPin} label="Cidade" value={employee.city} />
              <SummaryItem icon={Users} label="Liderança" value={employee.leadership} />
            </div>
          </CardContent>
        </Card>
      </div>
    </FullWidthLayout>
  );
};

export default EmployeeSummary;