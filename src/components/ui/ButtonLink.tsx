import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

type ButtonLinkProps = {
  label?: string | null
  href?: string | null
  className?: string
}

export function ButtonLink({
  label,
  href,
  className = '',
}: ButtonLinkProps) {
  if (!label) return null

  return (
    <Link
      href={href || '#'}
      className={`
        inline-flex min-h-12.5 min-w-55
        items-center justify-between gap-6
        rounded-full bg-orange
        ps-6 pe-2
        text-base text-white
        transition duration-300
        hover:scale-105
        ${className}
      `}
    >
      <span>{label}</span>

      <span
        className="
          flex size-9 items-center justify-center
          rounded-full bg-white
          text-orange
          transition duration-300
        "
      >
        <ArrowUpRight size={22} />
      </span>
    </Link>
  )
}