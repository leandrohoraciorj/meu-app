import React, { useState, useMemo } from "react";
import { EmployeeData } from "@/data/employees";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface EmployeeTableProps {
  employees: EmployeeData[];
}

// Utility function to convert data to CSV format
const convertToCSV = (data: EmployeeData[]) => {
  if (data.length === 0) return "";

  const headers = [
    "Nº NÚCLEO", "CIDADE", "NOME DO NÚCLEO", "LIDERANÇA", "NOME", "TELEFONE", 
    "MODALIDADE", "FUNÇÃO", "CREF", "VALOR", "CNPJ", "PIX", "BANCO", "AGENCIA", 
    "CONTA", "ENDEREÇO", "BAIRRO", "SEXO"
  ];

  const csvRows = [];
  csvRows.push(headers.join(';'));

  for (const employee of data) {
    const values = [
      employee.nucleusNumber,
      employee.city,
      employee.nucleusName,
      employee.leadership,
      employee.name,
      employee.phone,
      employee.modality,
      employee.role,
      employee.cref,
      employee.value,
      employee.cnpj,
      employee.pix,
      employee.bank,
      employee.agency,
      employee.account,
      employee.address,
      employee.neighborhood,
      employee.gender,
    ];
    // Wrapping values in quotes to handle commas/semicolons within data fields
    csvRows.push(values.map(v => `"${v}"`).join(';'));
  }

  return csvRows.join('\n');
};

export function EmployeeTable({ employees }: EmployeeTableProps) {
  const [filter, setFilter] = useState("");

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
    // Use 'text/csv;charset=utf-8;' for standard CSV, or 'text/csv;charset=windows-1252;' for better Excel compatibility with Portuguese characters, but utf-8 is generally preferred.
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
          <Download className="mr-2 h-4 w-4" /> Exportar CSV ({filteredEmployees.length})
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Núcleo</TableHead>
              <TableHead>Liderança</TableHead>
              <TableHead>Modalidade</TableHead>
              <TableHead className="text-right">Valor</TableHead>
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
                  <TableCell>{employee.modality}</TableCell>
                  <TableCell className="text-right">{employee.value}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}