import { useEffect } from 'react'

interface ToastProps {
  message: string
  onClose: () => void
}

/** Aviso temporário (role="status"), some sozinho depois de alguns segundos. */
export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-texto-principal px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
    >
      <span aria-hidden="true">✓</span>
      {message}
    </div>
  )
}
