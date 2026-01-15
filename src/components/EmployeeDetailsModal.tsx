import { EmployeeData } from "@/data/employees";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { showSuccess } from "@/utils/toast";
import { availableRoles } from "@/data/roles";
import { Card, CardContent } from "@/components/ui/card";
import { User, MapPin, Briefcase, Phone, DollarSign, Building, Hash, Users } from "lucide-react";

// Define o Zod schema (Deve ser o mesmo usado em Registration.tsx)
const EmployeeSchema = z.object({
  id: z.string(), // Adicionando ID para edição
  nucleusNumber: z.string().min(1, "Nº Núcleo é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  nucleusName: z.string().optional(),
  location: z.string().optional(),
  nucleusAddress: z.string().optional(),
  nucleusNeighborhood: z.string().optional(),
  leadership: z.string().min(1, "Liderança é obrigatória"),
  leadershipPhone: z.string().optional(),
  name: z.string().min(2, "Nome Completo é obrigatório"),
  phone: z.string().min(8, "Telefone é obrigatório"),
  modality: z.string().min(1, "Modalidade é obrigatória"),
  role: z.string().min(1, "Função é obrigatória"),
  cref: z.string().optional(),
  value: z.string().optional(),
  cnpj: z.string().optional(),
  pix: z.string().optional(),
  bank: z.string().optional(),
  agency: z.string().optional(),
  account: z.string().optional(),
  address: z.string().optional(),
  neighborhood: z.string().optional(),
  gender: z.enum(['masculino', 'feminino', 'outros'], {
    required_error: "Sexo é obrigatório",
  }),
});

type EmployeeFormValues = z.infer<typeof EmployeeSchema>;

interface EmployeeDetailsModalProps {
  employee: EmployeeData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EmployeeData) => void;
}

export function EmployeeDetailsModal({ employee, isOpen, onClose, onSave }: EmployeeDetailsModalProps) {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(EmployeeSchema),
    values: employee || undefined, // Preenche o formulário com os dados do funcionário
  });

  if (!employee) return null;

  const onSubmit = (data: EmployeeFormValues) => {
    onSave(data as EmployeeData);
    showSuccess(`Dados de ${data.name} atualizados com sucesso!`);
    onClose();
  };

  // Componente auxiliar para exibir um item de resumo
  const SummaryItem = ({ icon: Icon, label, value }: { 
    icon: React.ElementType, 
    label: string, 
    value: string | number 
  }) => (
    <div className="flex items-center space-x-2">
      <Icon className="h-5 w-5 text-primary" />
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold truncate">{value}</p>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle>Detalhes e Edição de Funcionário</DialogTitle>
            <DialogDescription>
              Visualize e edite todas as informações de {employee.name}.
            </DialogDescription>
          </DialogHeader>
          
          {/* Visual Summary Header - Expanded */}
          <Card className="mb-4 bg-muted/50">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
          
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Section 1: Nucleus Details (Dados do Núcleo) */}
                <h3 className="text-lg font-semibold">Dados do Núcleo</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="nucleusNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nº Núcleo *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nucleusName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Núcleo</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local (Ponto de Referência)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nucleusAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço do Núcleo</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nucleusNeighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro do Núcleo</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="leadership"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Liderança *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="leadershipPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tel. Liderança</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Section 2: Employee Details (Dados Pessoais e Contrato) */}
                <h3 className="text-lg font-semibold pt-4 border-t">Dados Pessoais e Contrato</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Nome Completo *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sexo *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o sexo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="feminino">Feminino</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Função *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a função" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableRoles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="modality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modalidade *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor (Salário)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Endereço Pessoal</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro Pessoal</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Section 3: Financial/Registration Details (Dados Financeiros e Registro) */}
                <h3 className="text-lg font-semibold pt-4 border-t">Dados Financeiros e Registro</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="cref"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CREF</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pix"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chave PIX</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="bank"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Banco</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agência</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="account"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Conta</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Salvar Alterações
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}