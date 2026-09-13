import { useState, type ChangeEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'

type FormState = {
  firstName: string
  lastName: string
  email: string
  interest: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const totalSteps = 3

const initialForm: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  interest: '',
  message: '',
}

const interestOptions = [
  'Mentoring & Support',
  'Event Volunteering',
  'Admin & Back Office',
  'Marketing & Outreach',
  'Professional Skills & Partnerships',
  'Other',
]

const inputCls =
  'w-full bg-lavender/60 border border-line rounded-xl px-4 py-3 text-ink placeholder-gray-400 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 focus:bg-white transition-colors'

const labelCls = 'text-sm font-bold text-accent uppercase tracking-wider'
const requiredMark = (
  <span className="text-red-500" aria-hidden="true">
    *
  </span>
)

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-sm text-red-500">{message}</p>
}

export default function GetInvolvedForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const progress = ((step + 1) / totalSteps) * 100

  const update = (field: keyof FormState) => (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validateStep = (): boolean => {
    const next: FormErrors = {}
    if (step === 0) {
      if (!form.firstName.trim()) next.firstName = 'Please enter your first name'
      if (!form.lastName.trim()) next.lastName = 'Please enter your last name'
      if (!form.email.trim()) {
        next.email = 'Please enter your email address'
      } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        next.email = 'Please enter a valid email address'
      }
    }
    if (step === 1 && !form.interest) {
      next.interest = 'Please choose how you would like to help'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const goNext = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, totalSteps - 1))
  }

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0))
  }

  const reset = () => {
    setForm(initialForm)
    setErrors({})
    setStep(0)
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="text-center py-10 space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-lavender flex items-center justify-center">
          <FontAwesomeIcon icon={faHeart} className="text-accent text-3xl" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-accent">Thank you, {form.firstName || 'friend'}!</h3>
        <p className="text-gray-600 max-w-sm mx-auto">
          We&apos;ve received your Get Involved application. Our team will reach out to you with the next
          steps.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-2 border-2 border-accent text-accent px-8 py-3 rounded-full font-bold text-sm hover:bg-accent hover:text-white transition-all"
        >
          Submit Another Response
        </button>
      </div>
    )
  }

  return (
    <form
      className="space-y-6"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        if (validateStep()) setSubmitted(true)
      }}
    >
      {/* Card header */}
      <div>
        <h3 className="text-2xl font-bold text-accent">Get Involved</h3>
        <p className="text-sm text-gray-500 mt-1">
          Tell us a little about yourself and how you&apos;d like to support Shipshape Minds.
        </p>
      </div>

      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-accent">
          <span>Step {step + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-lavender overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-5">
          <h4 className="text-lg font-bold text-ink">Tell us about yourself</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className={labelCls} htmlFor="vol-first-name">
                First Name {requiredMark}
              </label>
              <input
                id="vol-first-name"
                type="text"
                value={form.firstName}
                onChange={update('firstName')}
                placeholder="e.g. Naledi"
                className={`${inputCls} ${errors.firstName ? 'border-red-400 focus:ring-red-200' : ''}`}
                aria-required="true"
              />
              <FieldError message={errors.firstName} />
            </div>
            <div className="space-y-2">
              <label className={labelCls} htmlFor="vol-last-name">
                Last Name {requiredMark}
              </label>
              <input
                id="vol-last-name"
                type="text"
                value={form.lastName}
                onChange={update('lastName')}
                placeholder="e.g. Mokoena"
                className={`${inputCls} ${errors.lastName ? 'border-red-400 focus:ring-red-200' : ''}`}
                aria-required="true"
              />
              <FieldError message={errors.lastName} />
            </div>
          </div>
          <div className="space-y-2">
            <label className={labelCls} htmlFor="vol-email">
              Email Address {requiredMark}
            </label>
            <input
              id="vol-email"
              type="email"
              value={form.email}
              onChange={update('email')}
              placeholder="you@example.com"
              className={`${inputCls} ${errors.email ? 'border-red-400 focus:ring-red-200' : ''}`}
              aria-required="true"
            />
            <FieldError message={errors.email} />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <h4 className="text-lg font-bold text-ink">How you&apos;d like to help</h4>
          <div className="space-y-2">
            <label className={labelCls} htmlFor="vol-interest">
              Interest Area {requiredMark}
            </label>
            <select
              id="vol-interest"
              value={form.interest}
              onChange={update('interest')}
              className={`${inputCls} ${errors.interest ? 'border-red-400 focus:ring-red-200' : ''}`}
              aria-required="true"
            >
              <option value="" disabled>
                Select an area you&apos;d like to support…
              </option>
              {interestOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError message={errors.interest} />
          </div>
          <div className="space-y-2">
            <label className={labelCls} htmlFor="vol-message">
              Anything else you&apos;d like us to know?
            </label>
            <textarea
              id="vol-message"
              rows={4}
              value={form.message}
              onChange={update('message')}
              placeholder="Share your experience, availability, or questions (optional)"
              className={`${inputCls} resize-none`}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <h4 className="text-lg font-bold text-ink">Review your details</h4>
          <div className="rounded-xl bg-canvas/70 border border-line divide-y divide-line overflow-hidden">
            {(
              [
                ['First Name', form.firstName],
                ['Last Name', form.lastName],
                ['Email Address', form.email],
                ['Interest Area', form.interest],
              ] as [string, string][]
            ).map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 px-5 py-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 pt-0.5">{label}</span>
                <span className="font-medium text-ink text-right break-words">{value}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Once submitted, our team will review your application and be in touch with the next steps.
          </p>
        </div>
      )}

      {/* Step navigation */}
      <div className="flex items-center justify-between gap-4 pt-1">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 border-2 border-line text-ink/70 px-6 py-3 rounded-full font-bold text-sm hover:border-accent hover:text-accent transition-all"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" aria-hidden="true" />
            Back
          </button>
        ) : (
          <span />
        )}
        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-accent/90 transition-all"
          >
            Continue
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-accent/90 transition-all"
          >
            Submit Application
            <FontAwesomeIcon icon={faPaperPlane} className="text-xs" aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  )
}