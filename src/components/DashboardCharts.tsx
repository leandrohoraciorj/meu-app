import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmployeeData } from "@/data/employees";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardChartsProps {
  employees: EmployeeData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const processDataForRoleChart = (employees: EmployeeData[]) => {
  const roleCounts: Record<string, number> = {};
  employees.forEach(e => {
    const role = e.role || 'Não Definido';
    roleCounts[role] = (roleCounts[role] || 0) + 1;
  });
  return Object.keys(roleCounts).map(role => ({
    role,
    count: roleCounts[role],
  }));
};

const processDataForGenderChart = (employees: EmployeeData[]) => {
  const genderCounts: Record<string, number> = {};
  employees.forEach(e => {
    const gender = e.gender || 'Não Informado';
    genderCounts[gender] = (genderCounts[gender] || 0) + 1;
  });
  return Object.keys(genderCounts).map(gender => ({
    name: gender,
    value: genderCounts[gender],
  }));
};

export function DashboardCharts({ employees }: DashboardChartsProps) {
  const roleData = processDataForRoleChart(employees);
  const genderData = processDataForGenderChart(employees);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Chart 1: Distribution by Role (Função) */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Função</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={roleData}
              margin={{ top: 5, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="role" 
                stroke="hsl(var(--foreground))" 
                angle={-45} 
                textAnchor="end" 
                height={60}
              />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))' 
                }} 
                labelStyle={{ color: 'hsl(var(--foreground))' }} 
              />
              <Legend />
              <Bar dataKey="count" name="Funcionários" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Chart 2: Distribution by Gender (Sexo) */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Sexo</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))' 
                }} 
                labelStyle={{ color: 'hsl(var(--foreground))' }} 
              />
              <Legend 
                layout="horizontal" 
                align="center" 
                verticalAlign="bottom" 
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}