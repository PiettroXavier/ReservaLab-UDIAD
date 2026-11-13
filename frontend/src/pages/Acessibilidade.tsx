import AppLayout from '../components/AppLayout'
import Card from '../components/Card'
import { useAccessibility, type TextSize } from '../context/AccessibilityContext'

const TEXT_SIZES: { value: TextSize; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'grande', label: 'Grande' },
  { value: 'maior', label: 'Maior' },
]

export default function Acessibilidade() {
  const { textSize, setTextSize, highContrast, setHighContrast, reduceMotion, setReduceMotion } =
    useAccessibility()

  return (
    <AppLayout>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-texto-principal">Acessibilidade</h1>
        <p className="text-sm text-cinza-secundario">
          Ajuste a exibição do sistema de acordo com sua preferência. As mudanças são aplicadas
          imediatamente e salvas para os próximos acessos.
        </p>
      </div>

      <Card className="flex flex-col gap-4">
        <span className="font-semibold text-texto-principal">Tamanho do texto</span>
        <div className="flex gap-2" role="radiogroup" aria-label="Tamanho do texto">
          {TEXT_SIZES.map((option) => (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={textSize === option.value}
              onClick={() => setTextSize(option.value)}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                textSize === option.value
                  ? 'bg-azul-principal text-white'
                  : 'bg-fundo-claro text-texto-principal hover:bg-azul-suave'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Card>

      <Card className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-texto-principal">Alto contraste</span>
          <span className="text-sm text-cinza-secundario">
            Aumenta o contraste de cores para facilitar a leitura.
          </span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={highContrast}
          onClick={() => setHighContrast(!highContrast)}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
            highContrast ? 'bg-azul-principal' : 'bg-cinza-secundario/40'
          }`}
        >
          <span
            aria-hidden="true"
            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
              highContrast ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </Card>

      <Card className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-texto-principal">Reduzir animações</span>
          <span className="text-sm text-cinza-secundario">
            Remove transições e animações da interface.
          </span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={reduceMotion}
          onClick={() => setReduceMotion(!reduceMotion)}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
            reduceMotion ? 'bg-azul-principal' : 'bg-cinza-secundario/40'
          }`}
        >
          <span
            aria-hidden="true"
            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
              reduceMotion ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </Card>
    </AppLayout>
  )
}
