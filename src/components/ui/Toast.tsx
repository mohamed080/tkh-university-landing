'use client'

import { useEffect } from 'react'
import { CheckCircle2, X } from 'lucide-react'

type ToastProps = {
  message: string
  show: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, show, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (!show) return

    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [show, duration, onClose])

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-100 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-emerald-600 px-5 py-4 text-white shadow-2xl transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 size={20} className="shrink-0 text-white" />
      <span className="text-sm font-medium">{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className="ml-2 shrink-0 text-white/70 transition hover:text-white"
      >
        <X size={16} />
      </button>
    </div>
  )
}