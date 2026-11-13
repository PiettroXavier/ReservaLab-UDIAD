import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import { getSpaces } from '../data/api'
import type { Space } from '../data/types'

type Filter = 'Todos' | 'Biblioteca' | 'Sala Maker'

const FILTERS: Filter[] = ['Todos', 'Biblioteca', 'Sala Maker']

export default function Espacos() {
  const [spaces, setSpaces] = useState<Space[]>([])
  const [filter, setFilter] = useState<Filter>('Todos')

  useEffect(() => {
    getSpaces().then(setSpaces)
  }, [])

  const filtered = spaces.filter((s) => filter === 'Todos' || s.category === filter)

  return (
    <AppLayout>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-texto-principal">Espaços disponíveis</h1>
        <p className="text-sm text-cinza-secundario">
          Veja a Biblioteca e as Salas Maker e escolha onde fazer sua reserva.
        </p>
      </div>

      <div className="flex gap-2" role="tablist" aria-label="Filtrar por categoria">
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={filter === option}
            onClick={() => setFilter(option)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              filter === option
                ? 'bg-azul-principal text-white'
                : 'bg-white text-cinza-secundario hover:bg-azul-suave'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {filtered.map((space) => (
          <Link key={space.id} to={`/espacos/${space.id}`} className="w-[300px]">
            <Card className="flex h-full flex-col gap-3 transition-shadow hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)]">
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-texto-principal">{space.name}</span>
                <StatusBadge status={space.status} />
              </div>
              <span className="text-sm text-cinza-secundario">{space.capacity}</span>
              <span className="text-sm text-cinza-secundario">{space.location}</span>
            </Card>
          </Link>
        ))}
      </div>
    </AppLayout>
  )
}
