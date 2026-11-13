import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import Card from '../components/Card'
import Modal from '../components/Modal'
import StatusBadge from '../components/StatusBadge'
import Toast from '../components/Toast'
import { cancelReservation, getReservationById } from '../data/api'
import type { Reservation } from '../data/types'

export default function DetalhesReserva() {
  const { id } = useParams<{ id: string }>()
  const [reservation, setReservation] = useState<Reservation | null | undefined>(undefined)
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    if (!id) return
    getReservationById(id).then((r) => setReservation(r ?? null))
  }, [id])

  async function handleCancelar() {
    if (!reservation) return
    setCancelling(true)
    try {
      const updated = await cancelReservation(reservation.id)
      setReservation(updated)
      setModalOpen(false)
      setToast('Reserva cancelada com sucesso.')
    } finally {
      setCancelling(false)
    }
  }

  if (reservation === undefined) {
    return (
      <AppLayout>
        <p className="text-sm text-cinza-secundario">Carregando…</p>
      </AppLayout>
    )
  }

  if (reservation === null) {
    return (
      <AppLayout>
        <h1 className="text-3xl font-bold text-texto-principal">Reserva não encontrada</h1>
        <Link
          to="/minhas-reservas"
          className="w-fit text-sm font-semibold text-azul-principal hover:underline"
        >
          ← Voltar para Minhas Reservas
        </Link>
      </AppLayout>
    )
  }

  const canCancel = reservation.status === 'Confirmada'

  return (
    <AppLayout>
      <Link
        to="/minhas-reservas"
        className="w-fit text-sm font-semibold text-azul-principal hover:underline"
      >
        ← Voltar para Minhas Reservas
      </Link>

      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold text-texto-principal">{reservation.spaceName}</h1>
        <StatusBadge status={reservation.status} />
      </div>

      <Card className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-cinza-secundario">Código da reserva</span>
          <span className="text-texto-principal">{reservation.code}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-cinza-secundario">Data</span>
          <span className="text-texto-principal">{reservation.date}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-cinza-secundario">Horário</span>
          <span className="text-texto-principal">{reservation.time}</span>
        </div>
      </Card>

      {canCancel && (
        <Button variant="danger" className="w-fit" onClick={() => setModalOpen(true)}>
          Cancelar reserva
        </Button>
      )}

      <Modal
        open={modalOpen}
        title="Cancelar reserva"
        onClose={() => setModalOpen(false)}
        onConfirm={handleCancelar}
        confirmLabel={cancelling ? 'Cancelando…' : 'Sim, cancelar'}
        cancelLabel="Voltar"
        danger
      >
        Tem certeza de que deseja cancelar esta reserva? Essa ação não pode ser desfeita.
      </Modal>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AppLayout>
  )
}
