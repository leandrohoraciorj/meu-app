import { useState, useCallback } from 'react';
import { EmployeeData, mockEmployees } from '@/data/employees';

export function useEmployees() {
  const [employees, setEmployees] = useState<EmployeeData[]>(mockEmployees);

  const addEmployee = useCallback((newEmployee: Omit<EmployeeData, 'id'>) => {
    const employeeWithId: EmployeeData = {
      ...newEmployee,
      id: `e${employees.length + 1}-${Date.now()}`,
    };
    setEmployees((prev) => [employeeWithId, ...prev]);
  }, [employees.length]);

  const updateEmployee = useCallback((updatedEmployee: EmployeeData) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === updatedEmployee.id ? updatedEmployee : e))
    );
  }, []);

  const deleteEmployee = useCallback((employeeId: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== employeeId));
  }, []);

  return {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
}