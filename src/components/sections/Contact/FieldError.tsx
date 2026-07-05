import { CircleX } from 'lucide-react'

type FieldErrorProps = {
  message?: string
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null

  return (
    <div className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#D20000]">
      <CircleX size={14} className="shrink-0" />
      <span>{message}</span>
    </div>
  )
}