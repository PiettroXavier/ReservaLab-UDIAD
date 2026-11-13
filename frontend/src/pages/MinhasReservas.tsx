import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import { getReservations } from '../data/api'
import type { Reservation } from '../data/types'

export default function MinhasReservas() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getReservations().then((list) => {
      setReservations(list)
      setLoading(false)
    })
  }, [])

  return (
    <AppLayout>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-texto-principal">Minhas Reservas</h1>
        <p className="text-sm text-cinza-secundario">
          Acompanhe o status de todas as suas reservas.
        </p>
      </div>

      {loading && <p className="text-sm text-cinza-secundario">Carregando…</p>}

      {!loading && reservations.length === 0 && (
        <Card className="flex flex-col gap-2">
          <p className="text-sm text-cinza-secundario">
            Você ainda não tem nenhuma reserva. Que tal reservar um espaço agora?
          </p>
          <Link to="/espacos" className="w-fit text-sm font-semibold text-azul-principal hover:underline">
            Ver espaços disponíveis
          </Link>
        </Card>
      )}

      <div className="flex flex-col gap-4">
        {reservations.map((r) => (
          <Link key={r.id} to={`/minhas-reservas/${r.id}`}>
            <Card className="flex items-center justify-between gap-5 transition-shadow hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)]">
              <div className="flex flex-col gap-1.5">
                <span className="font-semibold text-texto-principal">{r.spaceName}</span>
                <span className="text-sm text-cinza-secundario">
                  {r.code} · {r.date} · {r.time}
                </span>
              </div>
              <StatusBadge status={r.status} />
            </Card>
          </Link>
        ))}
      </div>
    </AppLayout>
  )
}
