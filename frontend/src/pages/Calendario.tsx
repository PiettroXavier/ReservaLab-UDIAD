import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import Card from '../components/Card'
import { getSpaceById, getTimeSlots } from '../data/api'
import { getDraft, saveDraft } from '../data/reservationDraft'
import type { Space } from '../data/types'

function nextDays(count: number): { label: string; value: string }[] {
  const days = []
  const today = new Date()
  for (let i = 1; i <= count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const value = d.toLocaleDateString('pt-BR')
    const label = d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })
    days.push({ label, value })
  }
  return days
}

export default function Calendario() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [space, setSpace] = useState<Space | null>(null)
  const [slots, setSlots] = useState<string[]>([])
  const [date, setDate] = useState<string | null>(() => {
    const draft = getDraft()
    return draft && draft.spaceId === id ? (draft.date ?? null) : null
  })
  const [time, setTime] = useState<string | null>(() => {
    const draft = getDraft()
    return draft && draft.spaceId === id ? (draft.time ?? null) : null
  })

  const days = nextDays(10)

  useEffect(() => {
    if (!id) return
    getSpaceById(id).then((s) => setSpace(s ?? null))
    getTimeSlots().then(setSlots)
  }, [id])

  function handleContinuar() {
    if (!space || !date || !time) return
    saveDraft({ spaceId: space.id, spaceName: space.name, date, time })
    navigate(`/espacos/${space.id}/revisao`)
  }

  if (!space) {
    return (
      <AppLayout>
        <p className="text-sm text-cinza-secundario">Carregando…</p>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-texto-principal">Escolha data e horário</h1>
        <p className="text-sm text-cinza-secundario">{space.name}</p>
      </div>

      <Card className="flex flex-col gap-4">
        <span className="text-sm font-semibold text-cinza-secundario">Data</span>
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              key={day.value}
              type="button"
              onClick={() => setDate(day.value)}
              aria-pressed={date === day.value}
              className={`rounded-lg px-3.5 py-2.5 text-sm font-semibold capitalize transition-colors ${
                date === day.value
                  ? 'bg-azul-principal text-white'
                  : 'bg-fundo-claro text-texto-principal hover:bg-azul-suave'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>
      </Card>

      <Card className="flex flex-col gap-4">
        <span className="text-sm font-semibold text-cinza-secundario">Horário</span>
        <div className="flex flex-wrap gap-2">
          {slots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setTime(slot)}
              aria-pressed={time === slot}
              className={`rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                time === slot
                  ? 'bg-azul-principal text-white'
                  : 'bg-fundo-claro text-texto-principal hover:bg-azul-suave'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </Card>

      <Button onClick={handleContinuar} disabled={!date || !time} className="w-fit">
        Continuar
      </Button>
    </AppLayout>
  )
}
