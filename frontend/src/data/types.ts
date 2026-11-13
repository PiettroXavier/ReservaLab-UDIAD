export type SpaceStatus = 'Disponível' | 'Reservado' | 'Indisponível'
export type ReservaStatus = 'Confirmada' | 'Cancelada' | 'Concluída'

export interface Space {
  id: string
  name: string
  category: 'Biblioteca' | 'Sala Maker'
  capacity: string
  equipment: string
  location: string
  status: SpaceStatus
}

export interface Reservation {
  id: string
  code: string
  spaceId: string
  spaceName: string
  date: string
  time: string
  status: ReservaStatus
}

/** Rascunho de reserva em andamento (fluxo Calendário → Revisão → Confirmação). */
export interface ReservationDraft {
  spaceId: string
  spaceName: string
  date: string
  time: string
}

export interface Notification {
  id: string
  title: string
  message: string
  date: string
  read: boolean
}
