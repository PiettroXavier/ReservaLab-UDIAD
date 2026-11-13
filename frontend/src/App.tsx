import { Navigate, Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Acessibilidade from './pages/Acessibilidade'
import AjudaRegras from './pages/AjudaRegras'
import Calendario from './pages/Calendario'
import Confirmacao from './pages/Confirmacao'
import Dashboard from './pages/Dashboard'
import DetalhesEspaco from './pages/DetalhesEspaco'
import DetalhesReserva from './pages/DetalhesReserva'
import Espacos from './pages/Espacos'
import Login from './pages/Login'
import MinhasReservas from './pages/MinhasReservas'
import Notificacoes from './pages/Notificacoes'
import Perfil from './pages/Perfil'
import RevisaoReserva from './pages/RevisaoReserva'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />

      <Route
        path="/espacos"
        element={
          <RequireAuth>
            <Espacos />
          </RequireAuth>
        }
      />
      <Route
        path="/espacos/:id"
        element={
          <RequireAuth>
            <DetalhesEspaco />
          </RequireAuth>
        }
      />
      <Route
        path="/espacos/:id/calendario"
        element={
          <RequireAuth>
            <Calendario />
          </RequireAuth>
        }
      />
      <Route
        path="/espacos/:id/revisao"
        element={
          <RequireAuth>
            <RevisaoReserva />
          </RequireAuth>
        }
      />
      <Route
        path="/espacos/:id/confirmacao"
        element={
          <RequireAuth>
            <Confirmacao />
          </RequireAuth>
        }
      />

      <Route
        path="/minhas-reservas"
        element={
          <RequireAuth>
            <MinhasReservas />
          </RequireAuth>
        }
      />
      <Route
        path="/minhas-reservas/:id"
        element={
          <RequireAuth>
            <DetalhesReserva />
          </RequireAuth>
        }
      />

      <Route
        path="/notificacoes"
        element={
          <RequireAuth>
            <Notificacoes />
          </RequireAuth>
        }
      />
      <Route
        path="/perfil"
        element={
          <RequireAuth>
            <Perfil />
          </RequireAuth>
        }
      />
      <Route
        path="/ajuda"
        element={
          <RequireAuth>
            <AjudaRegras />
          </RequireAuth>
        }
      />
      <Route
        path="/acessibilidade"
        element={
          <RequireAuth>
            <Acessibilidade />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
