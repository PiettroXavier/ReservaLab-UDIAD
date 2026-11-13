import {
  notifications as seedNotifications,
  reservations as seedReservations,
  spaces,
  timeSlots,
} from './mockData'
import type { Notification, Reservation, ReservationDraft, Space } from './types'

// Camada de acesso a dados do frontend.
//
// Hoje isso só devolve os dados mockados em mockData.ts (persistidos em
// localStorage para simular um backend com estado). Quando o backend
// estiver pronto, é só trocar o corpo destas funções por chamadas fetch/axios
// pra API real — o resto do app (páginas e componentes) não precisa mudar,
// porque todo mundo já consome os dados só por aqui.
//
// Exemplo de como deve ficar depois:
//   export async function getSpaces(): Promise<Space[]> {
//     const res = await fetch(`${API_BASE_URL}/spaces`)
//     return res.json()
//   }

const SIMULATED_DELAY_MS = 200
const RESERVATIONS_KEY = 'reservalab_reservations'
const NOTIFICATIONS_KEY = 'reservalab_notifications'

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_DELAY_MS))
}

// TODO(backend): toda a lógica de leitura/escrita em localStorage abaixo
// existe só pra simular persistência sem um backend de verdade. Ela some
// inteira quando as chamadas fetch/axios reais entrarem no lugar.
function readStore<T>(key: string, seed: T[]): T[] {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw) as T[]
  } catch {
    // JSON inválido: ignora e recomeça a partir do seed
  }
  localStorage.setItem(key, JSON.stringify(seed))
  return seed
}

function writeStore<T>(key: string, value: T[]) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getReservationsStore(): Reservation[] {
  return readStore(RESERVATIONS_KEY, seedReservations)
}

function getNotificationsStore(): Notification[] {
  return readStore(NOTIFICATIONS_KEY, seedNotifications)
}

function generateCode(): string {
  const n = Math.floor(10000 + Math.random() * 90000)
  return `#RM${n}`
}

export async function getSpaces(): Promise<Space[]> {
  return delay(spaces)
}

export async function getSpaceById(id: string): Promise<Space | undefined> {
  return delay(spaces.find((s) => s.id === id))
}

export async function getTimeSlots(): Promise<string[]> {
  return delay(timeSlots)
}

export async function getReservations(): Promise<Reservation[]> {
  return delay(getReservationsStore())
}

export async function getReservationById(id: string): Promise<Reservation | undefined> {
  return delay(getReservationsStore().find((r) => r.id === id))
}

export async function createReservation(draft: ReservationDraft): Promise<Reservation> {
  const store = getReservationsStore()
  const reservation: Reservation = {
    id: `r${Date.now()}`,
    code: generateCode(),
    spaceId: draft.spaceId,
    spaceName: draft.spaceName,
    date: draft.date,
    time: draft.time,
    status: 'Confirmada',
  }
  writeStore(RESERVATIONS_KEY, [reservation, ...store])

  const notifStore = getNotificationsStore()
  const notification: Notification = {
    id: `n${Date.now()}`,
    title: 'Reserva confirmada',
    message: `Sua reserva de ${draft.spaceName} para ${draft.date} às ${draft.time.split('–')[0]} foi confirmada.`,
    date: new Date().toLocaleDateString('pt-BR'),
    read: false,
  }
  writeStore(NOTIFICATIONS_KEY, [notification, ...notifStore])

  return delay(reservation)
}

export async function cancelReservation(id: string): Promise<Reservation> {
  const store = getReservationsStore()
  const updated = store.map((r) => (r.id === id ? { ...r, status: 'Cancelada' as const } : r))
  writeStore(RESERVATIONS_KEY, updated)

  const found = updated.find((r) => r.id === id)
  if (!found) throw new Error('Reserva não encontrada')

  const notifStore = getNotificationsStore()
  const notification: Notification = {
    id: `n${Date.now()}`,
    title: 'Reserva cancelada',
    message: `Sua reserva de ${found.spaceName} em ${found.date} foi cancelada.`,
    date: new Date().toLocaleDateString('pt-BR'),
    read: false,
  }
  writeStore(NOTIFICATIONS_KEY, [notification, ...notifStore])

  return delay(found)
}

export async function getNotifications(): Promise<Notification[]> {
  return delay(getNotificationsStore())
}

export async function markNotificationRead(id: string): Promise<void> {
  const store = getNotificationsStore()
  const updated = store.map((n) => (n.id === id ? { ...n, read: true } : n))
  writeStore(NOTIFICATIONS_KEY, updated)
  return delay(undefined)
}

export async function login(email: string, _password: string): Promise<{ token: string }> {
  // TODO(backend): substituir por POST /auth/login real
  return delay({ token: 'mock-token-' + btoa(email) })
}
