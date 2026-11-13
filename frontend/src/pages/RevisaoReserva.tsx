import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import Card from '../components/Card'
import { createReservation } from '../data/api'
import { currentUser } from '../data/mockData'
import { clearDraft, getDraft, type PartialDraft } from '../data/reservationDraft'

export default function RevisaoReserva() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [draft] = useState<PartialDraft | null>(() => {
    const d = getDraft()
    if (!d || d.spaceId !== id || !d.date || !d.time) return null
    return d
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!draft) {
      navigate(`/espacos/${id}`, { replace: true })
    }
  }, [draft, id, navigate])

  async function handleConfirmar() {
    if (!draft?.date || !draft?.time) return
    setLoading(true)
    try {
      const reservation = await createReservation({
        spaceId: draft.spaceId,
        spaceName: draft.spaceName,
        date: draft.date,
        time: draft.time,
      })
      clearDraft()
      navigate(`/espacos/${draft.spaceId}/confirmacao`, { state: { reservationId: reservation.id } })
    } finally {
      setLoading(false)
    }
  }

  if (!draft) return null

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold text-texto-principal">Revisão da reserva</h1>
      <p className="text-sm text-cinza-secundario">Confira as informações antes de confirmar.</p>

      <Card className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-cinza-secundario">Espaço</span>
          <span className="text-texto-principal">{draft.spaceName}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-cinza-secundario">Data</span>
          <span className="text-texto-principal">{draft.date}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-cinza-secundario">Horário</span>
          <span className="text-texto-principal">{draft.time}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-cinza-secundario">Solicitante</span>
          <span className="text-texto-principal">
            {currentUser.name} · {currentUser.email}
          </span>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button onClick={handleConfirmar} disabled={loading}>
          {loading ? 'Confirmando…' : 'Confirmar reserva'}
        </Button>
        <Button variant="secondary" onClick={() => navigate(-1)} disabled={loading}>
          Voltar
        </Button>
      </div>
    </AppLayout>
  )
}
