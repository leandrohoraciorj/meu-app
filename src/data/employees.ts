export interface EmployeeData {
  id: string;
  nucleusNumber: number;
  city: string;
  nucleusName: string;
  location: string;
  nucleusAddress: string;
  nucleusNeighborhood: string;
  leadership: string;
  leadershipPhone: string;
  name: string;
  phone: string;
  modality: string;
  role: string; // FUNÇÃO
  cref: string;
  value: string; // VALOR (R$ 3.200,00)
  cnpj: string;
  pix: string;
  bank: string;
  agency: string;
  account: string;
  address: string;
  neighborhood: string;
  gender: 'masculino' | 'feminino' | 'outros';
}

export const mockEmployees: EmployeeData[] = [
  {
    id: 'e1',
    nucleusNumber: 301,
    city: 'RIO DAS FORES',
    nucleusName: 'Núcleo A - Futebol',
    location: 'Campo Municipal',
    nucleusAddress: 'Rua Principal, 100',
    nucleusNeighborhood: 'Centro',
    leadership: 'DU VEREADOR',
    leadershipPhone: '24981078838',
    name: 'Leandro Horacio',
    phone: '21980979040',
    modality: 'Futebol',
    role: 'Técnico',
    cref: '123654',
    value: 'R$ 3.200,00',
    cnpj: '12.255.600/0001-00',
    pix: '5241287744',
    bank: '314',
    agency: '2096',
    account: '1431112',
    address: 'Rua Professor Luiz',
    neighborhood: 'Anchieta',
    gender: 'masculino',
  },
  {
    id: 'e2',
    nucleusNumber: 302,
    city: 'RIO DAS FORES',
    nucleusName: 'Núcleo B - Vôlei',
    location: 'Ginásio Poliesportivo',
    nucleusAddress: 'Av. Secundária, 50',
    nucleusNeighborhood: 'Bairro Novo',
    leadership: 'SONERA',
    leadershipPhone: '24992640979',
    name: 'Maria Silva',
    phone: '21987654321',
    modality: 'Vôlei',
    role: 'Auxiliar Técnico',
    cref: '987654',
    value: 'R$ 1.500,00',
    cnpj: '12.255.600/0002-00',
    pix: '11122233344',
    bank: '001',
    agency: '1000',
    account: '5556667',
    address: 'Rua das Flores, 10',
    neighborhood: 'Jardim',
    gender: 'feminino',
  },
  {
    id: 'e3',
    nucleusNumber: 303,
    city: 'VALENÇA',
    nucleusName: 'Núcleo C - Natação',
    location: 'Clube Aquático',
    nucleusAddress: 'Praça Central',
    nucleusNeighborhood: 'Centro',
    leadership: 'MARQUINHO DA SAUDE',
    leadershipPhone: '24992974137',
    name: 'João Pereira',
    phone: '24999887766',
    modality: 'Natação',
    role: 'Coordenador',
    cref: '112233',
    value: 'R$ 4.000,00',
    cnpj: '12.255.600/0003-00',
    pix: '99988877766',
    bank: '237',
    agency: '3000',
    account: '1234567',
    address: 'Rua A, 5',
    neighborhood: 'Saúde',
    gender: 'masculino',
  },
  {
    id: 'e4',
    nucleusNumber: 306,
    city: 'VOLTA REDONDA',
    nucleusName: 'Núcleo D - Basquete',
    location: 'Quadra Municipal',
    nucleusAddress: 'Rua 1, 45',
    nucleusNeighborhood: 'Vila',
    leadership: 'MARCAO',
    leadershipPhone: '24999112233',
    name: 'Ana Costa',
    phone: '24999112233',
    modality: 'Basquete',
    role: 'Professor',
    cref: '445566',
    value: 'R$ 2.800,00',
    cnpj: '12.255.600/0004-00',
    pix: '44455566677',
    bank: '104',
    agency: '4000',
    account: '8889990',
    address: 'Av. Brasil, 200',
    neighborhood: 'Industrial',
    gender: 'feminino',
  },
];