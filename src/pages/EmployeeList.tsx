import { EmployeeTable } from "@/components/EmployeeTable";
import { EmployeeData } from "@/data/employees";
import { useState } from "react";
import { useEmployees } from "@/hooks/useEmployees";
import { EmployeeDetailsModal } from "@/components/EmployeeDetailsModal";
import { showSuccess, showError } from "@/utils/toast";
import { FullWidthLayout } from "@/components/FullWidthLayout"; // Importando o novo layout

const EmployeeList = () => {
  const { employees, updateEmployee, deleteEmployee } = useEmployees();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);

  const handleViewDetails = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSaveEmployee = (updatedData: EmployeeData) => {
    updateEmployee(updatedData);
    setIsModalOpen(false);
  };

  const handleDeleteEmployee = (employeeId: string, employeeName: string) => {
    deleteEmployee(employeeId);
    showError(`Funcionário ${employeeName} excluído com sucesso.`);
  };

  return (
    <FullWidthLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Tabela de Funcionários</h1>
        <EmployeeTable 
          employees={employees} 
          onViewDetails={handleViewDetails}
          onDelete={handleDeleteEmployee}
        />
      </div>
      
      <EmployeeDetailsModal
        employee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEmployee}
      />
    </FullWidthLayout>
  );
  
};

export default EmployeeList;