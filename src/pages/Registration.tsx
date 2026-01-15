import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { showSuccess } from "@/utils/toast";

// Define the Zod schema for validation
const EmployeeSchema = z.object({
  nucleusNumber: z.string().min(1, "Nº Núcleo é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  nucleusName: z.string().optional(),
  location: z.string().optional(), // Novo campo
  nucleusAddress: z.string().optional(), // Novo campo
  nucleusNeighborhood: z.string().optional(), // Novo campo
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

const Registration = () => {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      nucleusNumber: "",
      city: "",
      nucleusName: "",
      location: "", // Default value for new field
      nucleusAddress: "", // Default value for new field
      nucleusNeighborhood: "", // Default value for new field
      leadership: "",
      leadershipPhone: "",
      name: "",
      phone: "",
      modality: "",
      role: "",
      cref: "",
      value: "",
      cnpj: "",
      pix: "",
      bank: "",
      agency: "",
      account: "",
      address: "",
      neighborhood: "",
      gender: 'masculino',
    },
  });

  const onSubmit = (data: EmployeeFormValues) => {
    console.log("Novo Funcionário Cadastrado:", data);
    // Simulating successful registration
    showSuccess(`Funcionário ${data.name} cadastrado com sucesso!`);
    form.reset();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Cadastro de Funcionário</h1>
        <Card>
          <CardHeader>
            <CardTitle>Informações do Funcionário e Núcleo</CardTitle>
            <CardDescription>Preencha os dados detalhados do novo colaborador e seu núcleo de atuação. Campos marcados com * são obrigatórios.</CardDescription>
          </CardHeader>
          <CardContent>
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
                          <Input placeholder="301" {...field} />
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
                          <Input placeholder="Rio das Flores" {...field} />
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
                          <Input placeholder="Ex: Núcleo A - Futebol" {...field} />
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
                          <Input placeholder="Ex: Campo Municipal" {...field} />
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
                          <Input placeholder="Rua Principal, 100" {...field} />
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
                          <Input placeholder="Centro" {...field} />
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
                          <Input placeholder="Nome do Líder" {...field} />
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
                          <Input placeholder="(XX) XXXXX-XXXX" {...field} />
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
                      <FormItem>
                        <FormLabel>Nome Completo *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do Funcionário" {...field} />
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
                          <Input placeholder="(XX) XXXXX-XXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sexo *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Função *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Técnico, Coordenador" {...field} />
                        </FormControl>
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
                          <Input placeholder="Ex: Futebol, Vôlei" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor (Salário)</FormLabel>
                        <FormControl>
                          <Input placeholder="R$ 0.000,00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço Pessoal</FormLabel>
                        <FormControl>
                          <Input placeholder="Rua, Avenida, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro Pessoal</FormLabel>
                        <FormControl>
                          <Input placeholder="Bairro" {...field} />
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
                          <Input placeholder="Número CREF" {...field} />
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
                          <Input placeholder="XX.XXX.XXX/XXXX-XX" {...field} />
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
                          <Input placeholder="Chave PIX" {...field} />
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
                          <Input placeholder="Código do Banco" {...field} />
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
                          <Input placeholder="Agência" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="account"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conta</FormLabel>
                        <FormControl>
                          <Input placeholder="Conta Corrente" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  Cadastrar Funcionário
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Registration;