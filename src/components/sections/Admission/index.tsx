import { ButtonLink } from '@/components/ui/ButtonLink'
import type { AdmissionsData } from './types'

type AdmissionsProps = {
  data: AdmissionsData
}

export function Admissions({ data }: AdmissionsProps) {
  const steps = data.steps ?? []

  if (!steps.length) return null

  return (
    <section className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start lg:gap-16 bg-gradient-primary p-5 sm:p-20">
      {/* Header block */}
      <div className="flex flex-col items-start">
        {data.eyebrow && (
          <span className="eyebrow">
            {data.eyebrow}
          </span>
        )}
        <h2 className="section-title">
          {data.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-secondary">{data.description}</p>

        {/* CTA: shown here on lg+ and md, hidden on mobile (moves below steps instead) */}
        {data.cta?.label && (
          <div className="mt-6 hidden sm:block">
            <ButtonLink label={data.cta.label} href={data.cta.href} />
          </div>
        )}
      </div>

      {/* Steps list */}
      <ol className="flex flex-col divide-y divide-[#E4E1DC]">
        {steps.map((step, index) => (
          <li key={step.id ?? index} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1B2A4E] text-sm font-semibold text-white">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-base font-semibold text-primary sm:w-40 sm:shrink-0 lg:w-48">
                {step.title}
              </h3>
            </div>

            <p className="pl-12 text-sm leading-6 text-secondary sm:pl-0">{step.description}</p>
          </li>
        ))}
      </ol>

      {/* CTA: mobile only, sits after the steps list */}
      {data.cta?.label && (
        <div className="sm:hidden">
          <ButtonLink label={data.cta.label} href={data.cta.href} />
        </div>
      )}
    </section>
  )
}