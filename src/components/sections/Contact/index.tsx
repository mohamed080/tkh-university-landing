import { ContactForm } from './ContactForm'
import type { ContactData } from './types'

type ContactProps = {
  data: ContactData
}

export function Contact({ data }: ContactProps) {
  return (
    <section className="p-10 sm:p-20 flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start lg:gap-16 bg-gradient-primary">
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
      </div>

      <ContactForm
        phonePlaceholder={data.phonePlaceholder}
        emailPlaceholder={data.emailPlaceholder}
        messagePlaceholder={data.messagePlaceholder}
        submitButtonLabel={data.submitButtonLabel}
      />
    </section>
  )
}