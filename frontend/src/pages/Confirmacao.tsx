import { Link, useLocation } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import Card from '../components/Card'

export default function Confirmacao() {
  const location = useLocation()
  const state = location.state as { reservationId?: string } | null

  return (
    <AppLayout>
      <Card className="flex flex-col items-center gap-4 py-10 text-center">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-verde-disponivel text-2xl text-white"
        >
          ✓
        </span>
        <h1 className="text-2xl font-bold text-texto-principal">Reserva confirmada!</h1>
        <p className="max-w-[420px] text-sm text-cinza-secundario">
          Sua reserva foi registrada com sucesso. Você pode acompanhar os detalhes e o código da
          reserva em &quot;Minhas Reservas&quot;.
        </p>

        <div className="flex gap-3">
          {state?.reservationId ? (
            <Link to={`/minhas-reservas/${state.reservationId}`}>
              <Button>Ver detalhes da reserva</Button>
            </Link>
          ) : (
            <Link to="/minhas-reservas">
              <Button>Ir para Minhas Reservas</Button>
            </Link>
          )}
          <Link to="/espacos">
            <Button variant="secondary">Reservar outro espaço</Button>
          </Link>
        </div>
      </Card>
    </AppLayout>
  )
}
