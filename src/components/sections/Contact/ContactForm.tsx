'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { contactSchema, type ContactFormValues } from '@/lib/validation/contactSchema'
import { FieldError } from './FieldError'
import { Toast } from '@/components/ui/Toast'
import { useState } from 'react'

type ContactFormProps = {
  phonePlaceholder?: string | null
  emailPlaceholder?: string | null
  messagePlaceholder?: string | null
  submitButtonLabel?: string | null
}

export function ContactForm({
  phonePlaceholder,
  emailPlaceholder,
  messagePlaceholder,
  submitButtonLabel,
}: ContactFormProps) {
    const [showToast, setShowToast] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onSubmit',
  })

  const onSubmit = async (values: ContactFormValues) => {
    // TODO: wire this to your real submit endpoint (Payload collection, email service, etc.)
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.log('Contact form submitted:', values)
    reset()
    setShowToast(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col">
      {/* Phone */}
      <div className="border-b border-[#E4E1DC] py-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <label htmlFor="phone" className="shrink-0 text-sm text-primary">
            {phonePlaceholder || 'Your Phone Number'} <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="011 333 22211"
            className="w-full bg-transparent text-right text-sm font-bold text-primary placeholder:font-normal placeholder:text-secondary focus:outline-none sm:w-auto sm:flex-1"
          />
        </div>
      </div>
        <FieldError message={errors.phone?.message} />

      {/* Email */}
      <div className="border-b border-[#E4E1DC] py-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <label htmlFor="email" className="shrink-0 text-sm text-primary">
            {emailPlaceholder || 'Your Email'} <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="sarah.samy@webkeyz.com"
            className="w-full bg-transparent text-right text-sm font-bold text-primary placeholder:font-normal placeholder:text-secondary focus:outline-none sm:w-auto sm:flex-1"
          />
        </div>
      </div>
        <FieldError message={errors.email?.message} />

      {/* Message */}
      <div className="border-b border-[#E4E1DC] py-4">
        <label htmlFor="message" className="block text-sm text-primary">
          {messagePlaceholder || 'Your Message'} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={3}
          {...register('message')}
          className="mt-3 w-full resize-none bg-transparent text-sm text-primary placeholder:text-secondary focus:outline-none"
        />
      </div>
        <FieldError message={errors.message?.message} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-fit items-center gap-2 self-end rounded-full bg-orange px-6 py-3 text-base text-white transition disabled:opacity-60"
      >
        {isSubmitting ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <>
            {submitButtonLabel || 'Send Message'}
            <ArrowUpRight size={18} className="h-6 w-6 rounded-full bg-white p-px text-orange" />
          </>
        )}
      </button>

       <Toast
        message="Message sent — we'll be in touch shortly."
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </form>
  )
}