import AppLayout from '../components/AppLayout'
import Card from '../components/Card'

const REGRAS = [
  'As reservas podem ser feitas com até 10 dias de antecedência.',
  'Cada reserva tem duração de 1 hora e pode ser feita em qualquer horário disponível dentro do funcionamento da escola.',
  'É possível cancelar uma reserva confirmada a qualquer momento antes do horário marcado.',
  'O uso do espaço reservado é de responsabilidade do aluno ou professor que fez a reserva.',
  'Equipamentos das Salas Maker devem ser devolvidos ao local de origem ao final do uso.',
]

const PERGUNTAS = [
  {
    pergunta: 'Como faço uma reserva?',
    resposta:
      'Acesse "Espaços", escolha o espaço desejado, selecione data e horário disponíveis e confirme a reserva.',
  },
  {
    pergunta: 'Posso cancelar uma reserva?',
    resposta:
      'Sim. Acesse "Minhas Reservas", abra os detalhes da reserva confirmada e selecione "Cancelar reserva".',
  },
  {
    pergunta: 'O que significa cada status de reserva?',
    resposta:
      'Confirmada: a reserva está ativa. Cancelada: a reserva foi cancelada e o horário está livre novamente. Concluída: o período reservado já passou.',
  },
  {
    pergunta: 'Um espaço está indisponível. O que isso significa?',
    resposta:
      'O espaço está temporariamente fora de uso (manutenção ou outro motivo) e não pode ser reservado até voltar a ficar disponível.',
  },
]

export default function AjudaRegras() {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold text-texto-principal">Ajuda e Regras</h1>

      <Card className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-texto-principal">Regras de uso</h2>
        <ul className="flex flex-col gap-2 text-sm text-cinza-secundario">
          {REGRAS.map((regra) => (
            <li key={regra} className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>{regra}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-texto-principal">Perguntas frequentes</h2>
        {PERGUNTAS.map((item) => (
          <div key={item.pergunta} className="flex flex-col gap-1">
            <span className="font-semibold text-texto-principal">{item.pergunta}</span>
            <span className="text-sm text-cinza-secundario">{item.resposta}</span>
          </div>
        ))}
      </Card>
    </AppLayout>
  )
}
