import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import { getSpaceById } from '../data/api'
import { saveDraft } from '../data/reservationDraft'
import type { Space } from '../data/types'

export default function DetalhesEspaco() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [space, setSpace] = useState<Space | null | undefined>(undefined)

  useEffect(() => {
    if (!id) return
    getSpaceById(id).then((s) => setSpace(s ?? null))
  }, [id])

  if (space === undefined) {
    return (
      <AppLayout>
        <p className="text-sm text-cinza-secundario">Carregando…</p>
      </AppLayout>
    )
  }

  if (space === null) {
    return (
      <AppLayout>
        <h1 className="text-3xl font-bold text-texto-principal">Espaço não encontrado</h1>
        <Link to="/espacos" className="w-fit text-sm font-semibold text-azul-principal hover:underline">
          ← Voltar para Espaços
        </Link>
      </AppLayout>
    )
  }

  const disponivel = space.status === 'Disponível'

  function handleReservar() {
    if (!space) return
    saveDraft({ spaceId: space.id, spaceName: space.name })
    navigate(`/espacos/${space.id}/calendario`)
  }

  return (
    <AppLayout>
      <Link to="/espacos" className="w-fit text-sm font-semibold text-azul-principal hover:underline">
        ← Voltar para Espaços
      </Link>

      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold text-texto-principal">{space.name}</h1>
        <StatusBadge status={space.status} />
      </div>

      <Card className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-cinza-secundario">Capacidade</span>
          <span className="text-texto-principal">{space.capacity}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-cinza-secundario">Equipamentos</span>
          <span className="text-texto-principal">{space.equipment}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-cinza-secundario">Localização</span>
          <span className="text-texto-principal">{space.location}</span>
        </div>
      </Card>

      {!disponivel && (
        <Card className="border border-amarelo-aviso/40 bg-amarelo-aviso/10">
          <p className="text-sm font-medium text-texto-principal">
            Este espaço está {space.status.toLowerCase()} no momento e não pode ser reservado
            agora. Volte mais tarde ou escolha outro espaço na lista.
          </p>
        </Card>
      )}

      <Button onClick={handleReservar} disabled={!disponivel} className="w-fit">
        Reservar este espaço
      </Button>
    </AppLayout>
  )
}
