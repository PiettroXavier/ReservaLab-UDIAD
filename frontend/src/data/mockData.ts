import type { Notification, Reservation, Space } from './types'

// TODO(backend): substituir estes dados mockados por chamadas reais à API
// assim que o backend estiver disponível (ver src/data/api.ts).

export const spaces: Space[] = [
  {
    id: 'biblioteca',
    name: 'Biblioteca',
    category: 'Biblioteca',
    capacity: '40 pessoas',
    equipment: 'Mesas de estudo, computadores, acervo físico e digital',
    location: 'Térreo, Ala Principal',
    status: 'Disponível',
  },
  {
    id: 'sala-maker-01',
    name: 'Sala Maker 01',
    category: 'Sala Maker',
    capacity: '12 pessoas',
    equipment: 'Impressora 3D, notebooks, ferramentas de prototipagem',
    location: 'Bloco B, 2º andar',
    status: 'Reservado',
  },
  {
    id: 'sala-maker-02',
    name: 'Sala Maker 02',
    category: 'Sala Maker',
    capacity: '12 pessoas',
    equipment: 'Cortadora a laser, notebooks, kits de eletrônica',
    location: 'Bloco B, 2º andar (sala 2)',
    status: 'Disponível',
  },
  {
    id: 'sala-maker-03',
    name: 'Sala Maker 03',
    category: 'Sala Maker',
    capacity: '8 pessoas',
    equipment: 'Ferramentas manuais, bancada de montagem',
    location: 'Bloco B, 3º andar',
    status: 'Indisponível',
  },
]

export const reservations: Reservation[] = [
  {
    id: 'r1',
    code: '#RM24015',
    spaceId: 'sala-maker-01',
    spaceName: 'Sala Maker 01',
    date: '18/09/2026',
    time: '14:00–16:00',
    status: 'Confirmada',
  },
  {
    id: 'r2',
    code: '#RM24016',
    spaceId: 'biblioteca',
    spaceName: 'Biblioteca — Sala de Estudos',
    date: '20/09/2026',
    time: '10:00–11:00',
    status: 'Confirmada',
  },
]

// Horários disponíveis para reserva (janela de funcionamento da escola).
export const timeSlots: string[] = [
  '08:00–09:00',
  '09:00–10:00',
  '10:00–11:00',
  '11:00–12:00',
  '13:00–14:00',
  '14:00–15:00',
  '15:00–16:00',
  '16:00–17:00',
  '17:00–18:00',
]

export const notifications: Notification[] = [
  {
    id: 'n1',
    title: 'Reserva confirmada',
    message: 'Sua reserva da Sala Maker 01 para 18/09/2026 às 14:00 foi confirmada.',
    date: '15/09/2026',
    read: false,
  },
  {
    id: 'n2',
    title: 'Lembrete de reserva',
    message: 'Sua reserva da Biblioteca — Sala de Estudos é amanhã, 20/09/2026 às 10:00.',
    date: '19/09/2026',
    read: false,
  },
  {
    id: 'n3',
    title: 'Bem-vindo ao ReservaLab',
    message:
      'Agora você pode reservar espaços da Biblioteca e das Salas Maker diretamente pelo sistema.',
    date: '10/09/2026',
    read: true,
  },
]

export const currentUser = {
  name: 'Pedro Martins',
  role: 'Aluno · 3º ano',
  email: 'pedro.martins@escola.edu.br',
}
