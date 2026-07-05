'use client'

import { useEffect, useRef, useState } from 'react'
import { HeaderLogo } from './HeaderLogo'
import { TopNavigation } from './TopNavigation'
import { MainNavigation } from './MainNavigation'
import { HeaderActions } from './HeaderActions'
import { MegaMenu } from './MegaMenu'
import { MobileMenu } from './MobileMenu'
import type { HeaderData, MainNavigationItem } from './types'

type HeaderProps = {
  data: HeaderData
}

export function Header({ data }: HeaderProps) {
  const [activeItem, setActiveItem] = useState<MainNavigationItem | null>(null)
  const [displayedItem, setDisplayedItem] = useState<MainNavigationItem | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  const isOpen = Boolean(activeItem)

  useEffect(() => {
    if (activeItem) {
      setDisplayedItem(activeItem)
    }
  }, [activeItem])

  const toggleItem = (item: MainNavigationItem) => {
    setActiveItem((current) => (current?.label === item.label ? null : item))
  }

  const closeMenu = () => setActiveItem(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu()
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <header
      ref={headerRef}
      className="sticky top-8 z-50 mx-6 sm:mx-10 overflow-hidden rounded-4xl bg-[#FFFFFFB2] shadow-sm backdrop-blur-md transition-all duration-300"
    >
      <TopNavigation
        items={data.topNavigation}
        searchAction={data.searchAction}
        contactLink={data.contactLink}
      />

      <div className="mx-auto flex items-center justify-between px-6 py-4 lg:px-10">
        <HeaderLogo logo={data.logo} />

        <MainNavigation items={data.mainNavigation} activeItem={activeItem} onToggle={toggleItem} />

        <div className="flex items-center gap-4">
          <HeaderActions primaryCTA={data.primaryCTA} />

          <button
            type="button"
            className="relative flex h-5 w-6 flex-col items-start justify-center gap-1.5 xl:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span
              className={`absolute h-px bg-primary transition-all duration-300 ${
                mobileMenuOpen ? 'w-6 rotate-45' : 'w-6 -translate-y-2'
              }`}
            />
            <span
              className={`absolute h-px bg-primary transition-all duration-300 ${
                mobileMenuOpen ? 'w-6 -rotate-45' : 'w-4'
              }`}
            />
            <span
              className={`absolute h-px bg-primary transition-all duration-300 ${
                mobileMenuOpen ? 'w-0 opacity-0' : 'w-2 translate-y-2'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Desktop mega menu */}
      <div
        className={`hidden grid-rows-[0fr] transition-all duration-300 ease-out xl:grid ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'opacity-0'
        }`}
        onTransitionEnd={(event) => {
          if (event.propertyName === 'grid-template-rows' && !isOpen) {
            setDisplayedItem(null)
          }
        }}
      >
        <div className="overflow-hidden">
          {displayedItem && <MegaMenu megaMenu={displayedItem.megaMenu} onNavigate={closeMenu} />}
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`grid transition-all duration-300 ease-out xl:hidden ${
          mobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <MobileMenu
            items={data.mainNavigation}
            primaryCTA={data.primaryCTA}
            onNavigate={() => setMobileMenuOpen(false)}
          />
        </div>
      </div>
    </header>
  )
}
