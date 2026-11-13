import { useEffect, type ReactNode } from 'react'

interface ModalProps {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
  onConfirm: () => void
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
}

/**
 * Diálogo de confirmação acessível: fecha com Escape ou clique no backdrop,
 * marcado com role="dialog" + aria-modal pra leitores de tela.
 */
export default function Modal({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  danger = false,
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-texto-principal/50 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-[420px] flex-col gap-5 rounded-xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
      >
        <h2 id="modal-title" className="text-xl font-bold text-texto-principal">
          {title}
        </h2>
        <div className="text-sm text-cinza-secundario">{children}</div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-cinza-secundario hover:bg-fundo-claro"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors ${
              danger
                ? 'bg-vermelho-erro hover:bg-vermelho-hover'
                : 'bg-azul-principal hover:bg-azul-hover'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
