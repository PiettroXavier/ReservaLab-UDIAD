import { useEffect, useState } from 'react'
import AppLayout from '../components/AppLayout'
import Card from '../components/Card'
import { getNotifications, markNotificationRead } from '../data/api'
import type { Notification } from '../data/types'

export default function Notificacoes() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNotifications().then((list) => {
      setNotifications(list)
      setLoading(false)
    })
  }, [])

  async function handleMarkRead(id: string) {
    await markNotificationRead(id)
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-texto-principal">Notificações</h1>
        <p className="text-sm text-cinza-secundario">
          Avisos sobre suas reservas e sobre o sistema.
        </p>
      </div>

      {loading && <p className="text-sm text-cinza-secundario">Carregando…</p>}

      {!loading && notifications.length === 0 && (
        <Card>
          <p className="text-sm text-cinza-secundario">Você não tem notificações no momento.</p>
        </Card>
      )}

      <div className="flex flex-col gap-3">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={`flex flex-col gap-1.5 ${n.read ? '' : 'border-l-4 border-azul-principal'}`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="font-semibold text-texto-principal">{n.title}</span>
              <span className="shrink-0 text-xs text-cinza-secundario">{n.date}</span>
            </div>
            <p className="text-sm text-cinza-secundario">{n.message}</p>
            {!n.read && (
              <button
                type="button"
                onClick={() => handleMarkRead(n.id)}
                className="w-fit text-sm font-semibold text-azul-principal hover:underline"
              >
                Marcar como lida
              </button>
            )}
          </Card>
        ))}
      </div>
    </AppLayout>
  )
}
