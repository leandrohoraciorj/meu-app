import { Layout } from "@/components/Layout";
import { EmployeeTable } from "@/components/EmployeeTable";
import { mockEmployees, EmployeeData } from "@/data/employees";
import { useState } from "react";

const EmployeeList = () => {
  // Usando mock data para demonstração
  const [employees] = useState<EmployeeData[]>(mockEmployees);

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Tabela de Funcionários</h1>
        <EmployeeTable employees={employees} />
      </div>
    </Layout>
  );
  
};

export default EmployeeList;