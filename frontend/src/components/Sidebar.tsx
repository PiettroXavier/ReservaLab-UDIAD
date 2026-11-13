import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { getNotifications } from '../data/api'

const NAV_ITEMS = [
  { label: 'Início', to: '/', end: true },
  { label: 'Espaços', to: '/espacos' },
  { label: 'Minhas Reservas', to: '/minhas-reservas' },
  { label: 'Notificações', to: '/notificacoes' },
  { label: 'Perfil', to: '/perfil' },
  { label: 'Ajuda e Regras', to: '/ajuda' },
]

function NavItem({
  label,
  to,
  end,
  badge,
}: {
  label: string
  to: string
  end?: boolean
  badge?: number
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-semibold transition-colors ${
          isActive ? 'text-white' : 'text-white/70 hover:text-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && <span aria-hidden="true">●</span>}
          <span>{label}</span>
          {!!badge && (
            <span
              aria-label={`${badge} notificações não lidas`}
              className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-vermelho-erro px-1.5 text-[11px] font-bold text-white"
            >
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar() {
  const [unread, setUnread] = useState(0)
  const location = useLocation()

  useEffect(() => {
    getNotifications().then((list) => setUnread(list.filter((n) => !n.read).length))
  }, [location.pathname])

  return (
    <aside className="flex w-60 shrink-0 flex-col justify-between bg-azul-escuro px-5 py-7">
      <div className="flex flex-col gap-7">
        <span className="text-xl font-bold text-white">ReservaLab</span>
        <nav className="flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              badge={item.to === '/notificacoes' ? unread : undefined}
            />
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-4">
        <NavItem label="Acessibilidade" to="/acessibilidade" />
        <NavLink to="/login" className="text-sm font-semibold text-white/70 hover:text-white">
          Sair
        </NavLink>
      </div>
    </aside>
  )
}
