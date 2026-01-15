import React, { useState, useMemo } from "react";
import { EmployeeData } from "@/data/employees";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Eye, Trash2, Pencil } from "lucide-react";
import { showSuccess } from "@/utils/toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface EmployeeTableProps {
  employees: EmployeeData[];
  onViewDetails: (employee: EmployeeData) => void;
  onDelete: (employeeId: string, employeeName: string) => void;
}

// Utility function to convert data to CSV format
const convertToCSV = (data: EmployeeData[]) => {
  if (data.length === 0) return "";
  const headers = [
    "ID", "Nº NÚCLEO", "CIDADE", "NOME DO NÚCLEO", "LOCAL", "ENDEREÇO DO NÚCLEO", 
    "BAIRRO DO NÚCLEO", "LIDERANÇA", "TEL. LIDERANÇA", "NOME", "TELEFONE", 
    "MODALIDADE", "FUNÇÃO", "CREF", "VALOR", "CNPJ", "PIX", "BANCO", "AGENCIA", 
    "CONTA", "ENDEREÇO", "BAIRRO", "SEXO"
  ];
  const csvRows = [];
  csvRows.push(headers.join(';'));
  for (const employee of data) {
    const values = [
      employee.id, employee.nucleusNumber, employee.city, employee.nucleusName,
      employee.location, employee.nucleusAddress, employee.nucleusNeighborhood,
      employee.leadership, employee.leadershipPhone, employee.name, employee.phone,
      employee.modality, employee.role, employee.cref, employee.value, employee.cnpj,
      employee.pix, employee.bank, employee.agency, employee.account, employee.address,
      employee.neighborhood, employee.gender,
    ];
    // Wrapping values in quotes to handle commas/semicolons within data fields
    csvRows.push(values.map(v => `"${v}"`).join(';'));
  }
  return csvRows.join('\n');
};

export function EmployeeTable({ employees, onViewDetails, onDelete }: EmployeeTableProps) {
  const [filter, setFilter] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Check screen size on resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredEmployees = useMemo(() => {
    if (!filter) return employees;
    const lowerCaseFilter = filter.toLowerCase();
    return employees.filter(
      (e) =>
        e.name.toLowerCase().includes(lowerCaseFilter) ||
        e.city.toLowerCase().includes(lowerCaseFilter) ||
        e.role.toLowerCase().includes(lowerCaseFilter) ||
        e.nucleusName.toLowerCase().includes(lowerCaseFilter)
    );
  }, [employees, filter]);

  const handleExport = () => {
    const csvData = convertToCSV(filteredEmployees);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'relatorio_funcionarios.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSuccess("Dados exportados com sucesso!");
  };

  // Mobile card view component
  const EmployeeCard = ({ employee }: { employee: EmployeeData }) => (
    <div className="border rounded-lg p-4 mb-4 bg-card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{employee.name}</h3>
          <p className="text-sm text-muted-foreground">{employee.role}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link to={`/funcionarios/${employee.id}`} title="Ver Resumo">
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" onClick={() => onViewDetails(employee)} title="Ver/Editar Detalhes">
            <Pencil className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon" title="Excluir Funcionário">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso excluirá permanentemente o registro de {employee.name} do sistema.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => onDelete(employee.id, employee.name)} 
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Sim, Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">Cidade</p>
          <p>{employee.city}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Núcleo</p>
          <p>{employee.nucleusName}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Liderança</p>
          <p>{employee.leadership}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Telefone</p>
          <p>{employee.phone}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Tabela de Funcionários</h2>
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Filtrar por Nome, Cidade ou Função..." 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            className="pl-10" 
          />
        </div>
        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" /> 
          Exportar CSV ({filteredEmployees.length})
        </Button>
      </div>
      
      {/* Mobile view */}
      {isMobile ? (
        <div className="space-y-4">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum resultado encontrado.
            </div>
          )}
        </div>
      ) : (
        // Desktop view
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Núcleo</TableHead>
                <TableHead>Liderança</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.city}</TableCell>
                    <TableCell>{employee.nucleusName}</TableCell>
                    <TableCell>{employee.leadership}</TableCell>
                    <TableCell className="text-center space-x-2 min-w-[150px]">
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/funcionarios/${employee.id}`} title="Ver Resumo">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => onViewDetails(employee)} title="Ver/Editar Detalhes">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon" title="Excluir Funcionário">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. Isso excluirá permanentemente o registro de {employee.name} do sistema.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => onDelete(employee.id, employee.name)} 
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Sim, Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}