import { useState, type ChangeEvent, type FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faHeart,
  faPaperPlane,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { web3formsConfig } from '../siteConfig'

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  organisation: string
  involvementType: string
  otherInvolvement: string
  partnershipInterests: string
  organisationSupport: string
  schoolName: string
  schoolLocation: string
  collaborationType: string
  programmeInterest: string
  preferredContact: string
  skillsResources: string
  supportAreas: string[]
  supportOther: string
  availability: string[]
  participationPreference: string
  motivation: string
  additionalInfo: string
  consent: boolean
}

type FormErrors = Partial<Record<keyof FormState, string>>

const totalSteps = 4
const stepNames = ['About You', 'Get Involved', 'Your Contribution', 'Tell Us More']

const initialForm: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  organisation: '',
  involvementType: '',
  otherInvolvement: '',
  partnershipInterests: '',
  organisationSupport: '',
  schoolName: '',
  schoolLocation: '',
  collaborationType: '',
  programmeInterest: '',
  preferredContact: '',
  skillsResources: '',
  supportAreas: [],
  supportOther: '',
  availability: [],
  participationPreference: '',
  motivation: '',
  additionalInfo: '',
  consent: false,
}

const involvementOptions = [
  'Volunteer',
  'Become a Partner',
  'Sponsor a Programme or Initiative',
  'Corporate / CSI Partnership',
  'School or Community Collaboration',
  'Fundraising',
  'Professional Services / Skills Support',
  'Other',
]

const supportAreaOptions = [
  'Children & Youth Mental Health',
  'Emotional Wellness Programmes',
  'School Programmes',
  'Community Outreach',
  'Events & Workshops',
  'Fundraising',
  'Marketing & Awareness',
  'Administration & Operations',
  'Technology / Digital Support',
  'Other',
]

const availabilityOptions = [
  'Weekdays',
  'Weekends',
  'Evenings',
  'Flexible',
  'Once-off / Events only',
  'Ongoing',
]

const participationOptions = ['In Person', 'Remote', 'Both']

const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

const inputCls =
  'w-full bg-lavender/60 border border-line rounded-xl px-4 py-3 text-ink placeholder-gray-400 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 focus:bg-white transition-colors'

const labelCls = 'text-sm font-bold text-accent uppercase tracking-wider'
const helperCls = 'text-xs text-gray-500'
const requiredMark = (
  <span className="text-red-500" aria-hidden="true">
    *
  </span>
)

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-sm text-red-500">{message}</p>
}

function ChoiceCards({
  name,
  options,
  selected,
  onSelect,
}: {
  name: string
  options: string[]
  selected: string
  onSelect: (value: string) => void
}) {
  return (
    <div role="group" aria-label={name} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((option) => {
        const active = selected === option
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(active ? '' : option)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left font-medium transition-all duration-300 ${
              active
                ? 'border-accent bg-accent/5 text-accent'
                : 'border-lavender bg-white text-ink hover:border-accent/40'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                active ? 'border-accent' : 'border-line'
              }`}
            >
              {active && <span className="w-2.5 h-2.5 rounded-full bg-accent" />}
            </span>
            {option}
          </button>
        )
      })}
    </div>
  )
}

function MultiChips({
  name,
  options,
  selected,
  onToggle,
}: {
  name: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div role="group" aria-label={name} className="flex flex-wrap gap-3">
      {options.map((option) => {
        const active = selected.includes(option)
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(option)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              active
                ? 'bg-accent text-white shadow-md shadow-accent/20'
                : 'bg-white text-ink border border-lavender hover:border-accent/40 hover:text-accent'
            }`}
          >
            {active && <FontAwesomeIcon icon={faCheck} className="text-xs" aria-hidden="true" />}
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default function GetInvolvedForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const progress = ((step + 1) / totalSteps) * 100

  const update =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

  const updateCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setForm((prev) => ({ ...prev, consent: checked }))
    if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }))
  }

  const toggleMulti =
    (field: 'supportAreas' | 'availability') => (value: string) => {
      setForm((prev) => {
        const list = prev[field].includes(value)
          ? prev[field].filter((item) => item !== value)
          : [...prev[field], value]
        return { ...prev, [field]: list }
      })
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
      if (!form.phone.trim()) next.phone = 'Please enter your phone number'
    }
    if (step === 1) {
      if (!form.involvementType) next.involvementType = "Please select how you'd like to get involved"
      if (form.involvementType === 'Other' && !form.otherInvolvement.trim()) {
        next.otherInvolvement = "Please tell us how you'd like to get involved"
      }
    }
    if (step === 2 && !form.participationPreference) {
      next.participationPreference = 'Please choose how you would prefer to participate'
    }
    if (step === 3) {
      if (!form.motivation.trim()) next.motivation = "Please tell us why you'd like to get involved"
      if (!form.consent) next.consent = 'Please accept the consent statement before submitting'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const goNext = () => {
    if (validateStep()) {
      setSubmitError('')
      setStep((s) => Math.min(s + 1, totalSteps - 1))
    }
  }

  const goBack = () => {
    setSubmitError('')
    setStep((s) => Math.max(s - 1, 0))
  }

  const reset = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitError('')
    setStep(0)
    setSubmitted(false)
  }

  const buildPayload = () => {
    const name = `${form.firstName} ${form.lastName}`.trim()
    const payload: Record<string, unknown> = {
      access_key: accessKey,
      subject: `${web3formsConfig.subjectPrefix} — ${name || 'Get Involved'}`,
      from_name: name || 'Get Involved enquiry',
      botcheck: '',
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      organisation: form.organisation || '',
      involvementType: form.involvementType,
      skillsResources: form.skillsResources,
      supportAreas: form.supportAreas,
      availability: form.availability,
      participationPreference: form.participationPreference,
      motivation: form.motivation,
      additionalInformation: form.additionalInfo,
      consent: form.consent,
    }
    if (form.supportAreas.includes('Other') && form.supportOther.trim()) {
      payload.supportOther = form.supportOther.trim()
    }
    if (form.involvementType === 'Other' && form.otherInvolvement.trim()) {
      payload.otherInvolvement = form.otherInvolvement.trim()
    }
    if (form.involvementType === 'Corporate / CSI Partnership') {
      if (form.partnershipInterests.trim()) payload.partnershipInterests = form.partnershipInterests.trim()
      if (form.organisationSupport.trim()) payload.organisationSupport = form.organisationSupport.trim()
    }
    if (form.involvementType === 'School or Community Collaboration') {
      if (form.schoolName.trim()) payload.schoolName = form.schoolName.trim()
      if (form.schoolLocation.trim()) payload.schoolLocation = form.schoolLocation.trim()
      if (form.collaborationType.trim()) payload.collaborationType = form.collaborationType.trim()
    }
    if (form.involvementType === 'Sponsor a Programme or Initiative') {
      if (form.programmeInterest.trim()) payload.programmeInterest = form.programmeInterest.trim()
      if (form.preferredContact.trim()) payload.preferredContact = form.preferredContact.trim()
    }
    return payload
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateStep()) return
    if (!accessKey) {
      setSubmitError(
        'This form is not ready to receive submissions yet — the Web3Forms access key is not configured.',
      )
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch(web3formsConfig.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(buildPayload()),
      })
      const data = await res.json().catch(() => ({}))
      if (data.success === true) {
        setSubmitted(true)
      } else {
        setSubmitError(
          typeof data.message === 'string'
            ? data.message
            : 'Something went wrong while sending your submission. Please try again.',
        )
      }
    } catch {
      setSubmitError('Something went wrong while sending your submission. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10 space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-lavender flex items-center justify-center">
          <FontAwesomeIcon icon={faHeart} className="text-accent text-3xl" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-accent">Thank you for getting involved 💜</h3>
        <p className="text-gray-600 max-w-sm mx-auto">
          Your submission has been received. Our Shipshape Minds team will review your information and get
          in touch with you soon.
        </p>
        <p className="font-script text-lg text-gray-500">
          Together, we&apos;re planting seeds of hope and creating brighter futures.
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
    <form className="space-y-6" noValidate onSubmit={handleSubmit}>
      {/* Card header */}
      <div>
        <h3 className="text-2xl font-bold text-accent">Get Involved</h3>
        <p className="text-sm text-gray-500 mt-1">
          Tell us a little about yourself and how you&apos;d like to support Shipshape Minds.
        </p>
      </div>

      {/* Progress indicator */}
      <div className="space-y-3">
        <div className="hidden lg:block">
          <ol className="flex items-start gap-3">
            {stepNames.map((name, i) => {
              const state = i < step ? 'done' : i === step ? 'active' : 'todo'
              return (
                <li key={name} className="flex-1">
                  <span
                    className={`block text-[11px] font-bold uppercase tracking-wide text-center leading-tight transition-colors duration-300 ${
                      state === 'active'
                        ? 'text-accent'
                        : state === 'done'
                          ? 'text-accent/60'
                          : 'text-gray-400'
                    }`}
                  >
                    {name}
                  </span>
                  <div
                    className={`mt-2 h-1.5 rounded-full transition-colors duration-500 ${
                      state === 'active' ? 'bg-accent' : state === 'done' ? 'bg-accent/60' : 'bg-lavender'
                    }`}
                  />
                </li>
              )
            })}
          </ol>
        </div>
        <div className="lg:hidden flex justify-between text-xs font-bold uppercase tracking-widest text-accent">
          <span>Step {step + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-lavender overflow-hidden lg:hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {submitError && (
        <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {submitError}
        </div>
      )}

      {/* Step 1 — About You */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
            <div className="space-y-2">
              <label className={labelCls} htmlFor="vol-phone">
                Phone Number {requiredMark}
              </label>
              <input
                id="vol-phone"
                type="tel"
                value={form.phone}
                onChange={update('phone')}
                placeholder="e.g. 082 123 4567"
                className={`${inputCls} ${errors.phone ? 'border-red-400 focus:ring-red-200' : ''}`}
                aria-required="true"
              />
              <FieldError message={errors.phone} />
            </div>
          </div>
          <div className="space-y-2">
            <label className={labelCls} htmlFor="vol-organisation">
              Organisation / Company / School
            </label>
            <input
              id="vol-organisation"
              type="text"
              value={form.organisation}
              onChange={update('organisation')}
              placeholder="e.g. Local Primary School"
              className={inputCls}
            />
            <p className={helperCls}>Leave blank if you are applying as an individual.</p>
          </div>
        </div>
      )}

      {/* Step 2 — Get Involved */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-3">
            <label className={labelCls} id="vol-involvement-label">
              How would you like to get involved? {requiredMark}
            </label>
            <ChoiceCards
              name="How would you like to get involved?"
              options={involvementOptions}
              selected={form.involvementType}
              onSelect={(value) => {
                setForm((prev) => ({ ...prev, involvementType: value }))
                if (errors.involvementType) setErrors((prev) => ({ ...prev, involvementType: undefined }))
              }}
            />
            <FieldError message={errors.involvementType} />
          </div>

          {form.involvementType === 'Other' && (
            <div className="space-y-2 animated-in">
              <label className={labelCls} htmlFor="vol-other-involvement">
                Please tell us how you&apos;d like to get involved {requiredMark}
              </label>
              <input
                id="vol-other-involvement"
                type="text"
                value={form.otherInvolvement}
                onChange={update('otherInvolvement')}
                placeholder="Tell us a bit more about your idea"
                className={`${inputCls} ${errors.otherInvolvement ? 'border-red-400 focus:ring-red-200' : ''}`}
              />
              <FieldError message={errors.otherInvolvement} />
            </div>
          )}

          {form.involvementType === 'Corporate / CSI Partnership' && (
            <div className="space-y-4 bg-white border border-lavender rounded-2xl p-5 animated-in">
              <h5 className="text-sm font-bold text-accent uppercase tracking-wider">Partnership details</h5>
              <div className="space-y-2">
                <label className={labelCls} htmlFor="vol-partnership-interests">
                  Partnership interests
                </label>
                <textarea
                  id="vol-partnership-interests"
                  rows={2}
                  value={form.partnershipInterests}
                  onChange={update('partnershipInterests')}
                  placeholder="What areas of our work interest you?"
                  className={`${inputCls} resize-none`}
                />
              </div>
              <div className="space-y-2">
                <label className={labelCls} htmlFor="vol-organisation-support">
                  How would the organisation like to support Shipshape Minds?
                </label>
                <textarea
                  id="vol-organisation-support"
                  rows={2}
                  value={form.organisationSupport}
                  onChange={update('organisationSupport')}
                  placeholder="Funding, services, resources, volunteering days…"
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>
          )}

          {form.involvementType === 'School or Community Collaboration' && (
            <div className="space-y-4 bg-white border border-lavender rounded-2xl p-5 animated-in">
              <h5 className="text-sm font-bold text-accent uppercase tracking-wider">Collaboration details</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className={labelCls} htmlFor="vol-school-name">
                    School / Organisation Name
                  </label>
                  <input
                    id="vol-school-name"
                    type="text"
                    value={form.schoolName}
                    onChange={update('schoolName')}
                    placeholder="e.g. Riverside Primary"
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelCls} htmlFor="vol-school-location">
                    Location
                  </label>
                  <input
                    id="vol-school-location"
                    type="text"
                    value={form.schoolLocation}
                    onChange={update('schoolLocation')}
                    placeholder="e.g. Johannesburg"
                    className={inputCls}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={labelCls} htmlFor="vol-collaboration-type">
                  Type of collaboration
                </label>
                <input
                  id="vol-collaboration-type"
                  type="text"
                  value={form.collaborationType}
                  onChange={update('collaborationType')}
                  placeholder="e.g. Mental health workshops for learners"
                  className={inputCls}
                />
              </div>
            </div>
          )}

          {form.involvementType === 'Sponsor a Programme or Initiative' && (
            <div className="space-y-4 bg-white border border-lavender rounded-2xl p-5 animated-in">
              <h5 className="text-sm font-bold text-accent uppercase tracking-wider">Sponsorship details</h5>
              <div className="space-y-2">
                <label className={labelCls} htmlFor="vol-programme-interest">
                  Programme / initiative of interest
                </label>
                <input
                  id="vol-programme-interest"
                  type="text"
                  value={form.programmeInterest}
                  onChange={update('programmeInterest')}
                  placeholder="e.g. School Support programme"
                  className={inputCls}
                />
              </div>
              <div className="space-y-2">
                <label className={labelCls} htmlFor="vol-preferred-contact">
                  Preferred contact method
                </label>
                <select
                  id="vol-preferred-contact"
                  value={form.preferredContact}
                  onChange={update('preferredContact')}
                  className={inputCls}
                >
                  <option value="" disabled>
                    Select a contact method…
                  </option>
                  {['Email', 'Phone', 'WhatsApp', 'Other'].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className={labelCls}>Which areas are you interested in supporting?</label>
            <MultiChips
              name="Areas you are interested in supporting"
              options={supportAreaOptions}
              selected={form.supportAreas}
              onToggle={toggleMulti('supportAreas')}
            />
            {form.supportAreas.includes('Other') && (
              <div className="pt-2 space-y-2 animated-in">
                <label className={labelCls} htmlFor="vol-support-other">
                  Please specify
                </label>
                <input
                  id="vol-support-other"
                  type="text"
                  value={form.supportOther}
                  onChange={update('supportOther')}
                  placeholder="Tell us which area you'd like to support"
                  className={inputCls}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3 — Your Contribution */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls} htmlFor="vol-skills">
              What skills, experience, or resources would you like to contribute?
            </label>
            <textarea
              id="vol-skills"
              rows={4}
              value={form.skillsResources}
              onChange={update('skillsResources')}
              placeholder="Tell us about any skills, experience, professional knowledge, resources or support you would like to contribute."
              className={`${inputCls} resize-none`}
            />
          </div>

          <div className="space-y-3">
            <label className={labelCls}>What is your availability?</label>
            <MultiChips
              name="Availability"
              options={availabilityOptions}
              selected={form.availability}
              onToggle={toggleMulti('availability')}
            />
          </div>

          <div className="space-y-3">
            <label className={labelCls} id="vol-participation-label">
              How would you prefer to participate? {requiredMark}
            </label>
            <ChoiceCards
              name="How would you prefer to participate?"
              options={participationOptions}
              selected={form.participationPreference}
              onSelect={(value) => {
                setForm((prev) => ({ ...prev, participationPreference: value }))
                if (errors.participationPreference) {
                  setErrors((prev) => ({ ...prev, participationPreference: undefined }))
                }
              }}
            />
            <FieldError message={errors.participationPreference} />
          </div>
        </div>
      )}

      {/* Step 4 — Tell Us More */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls} htmlFor="vol-motivation">
              Why would you like to get involved with Shipshape Minds? {requiredMark}
            </label>
            <textarea
              id="vol-motivation"
              rows={4}
              value={form.motivation}
              onChange={update('motivation')}
              placeholder="Tell us what inspired you to support Shipshape Minds and the work we do."
              className={`${inputCls} resize-none ${errors.motivation ? 'border-red-400 focus:ring-red-200' : ''}`}
              aria-required="true"
            />
            <FieldError message={errors.motivation} />
          </div>

          <div className="space-y-2">
            <label className={labelCls} htmlFor="vol-additional-info">
              Is there anything else you would like us to know?
            </label>
            <textarea
              id="vol-additional-info"
              rows={3}
              value={form.additionalInfo}
              onChange={update('additionalInfo')}
              placeholder="Share any additional information, questions or comments with our team."
              className={`${inputCls} resize-none`}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={updateCheckbox}
                className="mt-0.5 w-5 h-5 shrink-0 accent-accent rounded"
                aria-required="true"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                I consent to Shipshape Minds contacting me regarding my Get Involved enquiry and understand
                that my information will be handled in accordance with the organisation&apos;s{' '}
                <span className="font-semibold text-accent">Privacy Policy</span>.
              </span>
            </label>
            <FieldError message={errors.consent} />
          </div>
        </div>
      )}

      {/* Step navigation */}
      <div className="flex items-center justify-between gap-4 pt-1">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            disabled={submitting}
            className="inline-flex items-center gap-2 border-2 border-line text-ink/70 px-6 py-3 rounded-full font-bold text-sm hover:border-accent hover:text-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-44 justify-center"
          >
            {submitting ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin aria-hidden="true" />
                Submitting…
              </>
            ) : (
              <>
                Submit My Interest
                <FontAwesomeIcon icon={faPaperPlane} className="text-xs" aria-hidden="true" />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  )
}