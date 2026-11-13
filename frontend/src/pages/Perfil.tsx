import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import Card from '../components/Card'
import { currentUser } from '../data/mockData'

export default function Perfil() {
  const navigate = useNavigate()

  function handleSair() {
    localStorage.removeItem('reservalab_token')
    navigate('/login')
  }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold text-texto-principal">Perfil</h1>

      <Card className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-cinza-secundario">Nome</span>
          <span className="text-texto-principal">{currentUser.name}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-cinza-secundario">Perfil</span>
          <span className="text-texto-principal">{currentUser.role}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-cinza-secundario">E-mail institucional</span>
          <span className="text-texto-principal">{currentUser.email}</span>
        </div>
      </Card>

      <Button variant="secondary" className="w-fit" onClick={handleSair}>
        Sair da conta
      </Button>
    </AppLayout>
  )
}
