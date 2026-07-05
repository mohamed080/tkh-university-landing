import Image from 'next/image'
import Link from 'next/link'
import { Phone, MapPin, Mail, ArrowUpRight } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { getMediaAlt, getMediaUrl } from '@/lib/utils'
import { FooterSearch } from './FooterSearch'
import type { FooterData } from './types'

type FooterProps = {
  data: FooterData
}

const SOCIAL_ICONS = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
}

export function Footer({ data }: FooterProps) {
  const logoSrc = getMediaUrl(data.logo)
  const logoAlt = getMediaAlt(data.logo, 'The Knowledge Hub Universities')
  const navigationGroups = data.navigationGroups ?? []
  const socialLinks = data.socialLinks ?? []
  const bottomLinks = data.bottomLinks ?? []

  return (
    <footer className="bg-[linear-gradient(101.56deg,#1E2749_18.07%,#101828_49.29%,#27202F_80.51%)] px-4 pb-8 pt-14 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-360">
        {/* Top block: logo | contact | search */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 xl:grid-cols-[1fr_1.2fr_1.4fr]">
          <div className="flex flex-col gap-4">
            {logoSrc && (
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={280}
                height={60}
                className="h-15 w-70 object-contain"
              />
            )}
            <p className="text-sm leading-6 text-white">{data.description}</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold">Contact Us</h3>

            <div className="flex flex-col gap-3 text-sm text-white/90">
              {data.contact?.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={16} className="shrink-0" />
                  <span>{data.contact.phone}</span>
                </div>
              )}
              {data.contact?.address && (
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span className="leading-5">{data.contact.address}</span>
                </div>
              )}
              {data.contact?.email && (
                <div className="flex items-center gap-3">
                  <Mail size={16} className="shrink-0" />
                  <span>{data.contact.email}</span>
                </div>
              )}
            </div>

            {data.cta?.label && (
              <Link
                href={data.cta.href || '#'}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-orange px-6 py-3 text-base text-white"
              >
                {data.cta.label}
                <ArrowUpRight
                  size={18}
                  className="h-6 w-6 rounded-full bg-white p-px text-orange"
                />
              </Link>
            )}
          </div>

          {/* Search + social — spans full width on lg, own column on xl+ */}
          <div className="flex flex-col gap-4 lg:col-span-2 xl:col-span-1">
            {data.searchTitle && <h3 className="text-sm font-semibold">{data.searchTitle}</h3>}

            <FooterSearch
              placeholder={data.search?.placeholder}
              buttonLabel={data.search?.buttonLabel}
            />

            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.platform ? SOCIAL_ICONS[social.platform] : null
                  if (!Icon) return null

                  return (
                    <Link
                      key={`${social.platform}-${index}`}
                      href={social.url || '#'}
                      aria-label={social.platform}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#2C2A614D] text-white/70 transition hover:border-orange hover:text-orange"
                    >
                      <Icon size={16} />
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-[#B1B3B6]" />

        {/* Navigation groups */}
        {navigationGroups.length > 0 && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-10 xl:flex xl:flex-wrap xl:justify-between">
            {navigationGroups.map((group, index) => (
              <div
                key={group.id ?? index}
                className={`flex flex-col gap-3 xl:min-w-35 ${
                  !group.title ? 'border-[#B1B3B6] pl-6 xl:border-l xl:pl-10' : ''
                }`}
              >
                {group.title && <h4 className="text-lg font-bold text-white">{group.title}</h4>}
                <ul className="flex flex-col gap-2.5">
                  {group.links?.map((link) => (
                    <li key={`${link.label}-${link.href}`}>
                      <Link
                        href={link.href || '#'}
                        className="text-sm text-white/70 transition hover:text-orange"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Copyright + legal links */}
        <div className="mt-8 flex flex-col items-center gap-8 border-t border-[#B1B3B6] pt-8 md:flex-row md:justify-between md:pt-6">
          {data.copyright && <p className="text-sm text-white/70">{data.copyright}</p>}
          {bottomLinks.length > 0 && (
            <div className="flex flex-wrap gap-x-6">
              {bottomLinks.map((link) => (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href || '#'}
                  className="text-sm text-white/70 transition hover:text-orange"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
