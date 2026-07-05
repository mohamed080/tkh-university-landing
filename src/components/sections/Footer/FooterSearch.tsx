'use client'

import { Search } from 'lucide-react'

type FooterSearchProps = {
  placeholder?: string | null
  buttonLabel?: string | null
}

export function FooterSearch({ placeholder, buttonLabel }: FooterSearchProps) {
  return (
    <form className="flex w-full items-center gap-3 max-w-150">
      <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-3">
        <Search size={16} className="shrink-0 text-secondary" />
        <input
          type="text"
          placeholder={placeholder || 'Search...'}
          className="w-full bg-transparent text-sm text-primary placeholder:text-secondary focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-full bg-orange px-6 py-3 text-sm font-medium text-white"
      >
        {buttonLabel || 'Search'}
      </button>
    </form>
  )
}