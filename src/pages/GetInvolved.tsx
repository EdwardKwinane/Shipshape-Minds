import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faUserGroup,
  faHandshake,
  faBullhorn,
  faHandHoldingHeart,
  faClipboardList,
  faComments,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import GetInvolvedForm from '../components/GetInvolvedForm'

type InvolvementOption = {
  icon: IconDefinition
  title: string
  body: string
  highlight?: boolean
  cta?: { label: string; to?: string; href?: string }
  socials?: IconDefinition[]
}

const involvement: InvolvementOption[] = [
  {
    icon: faUserGroup,
    title: 'Volunteer',
    body: 'Join our team of dedicated individuals working on the ground to support children and families.',
    cta: { label: 'Register as a Volunteer', href: '#volunteer-form' },
  },
  {
    icon: faHandshake,
    title: 'Partner With Us',
    body: 'Corporations and organizations can partner with us to fund programs or provide specialized services.',
    cta: { label: 'Discuss Partnership', to: '/contact' },
    highlight: true,
  },
  {
    icon: faBullhorn,
    title: 'Spread Awareness',
    body: 'Use your platform to share our stories and help us reach more people who need our support.',
    socials: [faFacebookF, faInstagram, faTwitter],
  },
]

const volunteerSteps = [
  {
    icon: faClipboardList,
    title: "Tell us how you'd like to help",
    body: 'Complete the short Get Involved form.',
  },
  {
    icon: faComments,
    title: 'Connect with our team',
    body: "We'll review your application and contact you about the next steps.",
  },
  {
    icon: faSeedling,
    title: 'Start making an impact',
    body: 'Join our programmes, initiatives or partnerships and help create positive change.',
  },
]

export default function GetInvolved() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 bg-accent text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">Get Involved</h1>
          <p className="font-script text-2xl opacity-80">Together, we can create brighter futures for our youth.</p>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            There are many ways you can support our mission. Whether you have time, resources, or a platform, your contribution makes a difference.
          </p>
        </div>
      </section>

      {/* Involvement Options */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {involvement.map((option) => (
            <div
              key={option.title}
              className={`p-10 rounded-jumbo space-y-6 flex flex-col items-center text-center ${option.highlight ? 'bg-lavender' : 'bg-canvas'}`}
            >
              <div className="w-16 h-16 bg-white text-accent rounded-full flex items-center justify-center text-2xl shadow-sm">
                <FontAwesomeIcon icon={option.icon} />
              </div>
              <h3 className="text-2xl font-bold text-accent">{option.title}</h3>
              <p className="text-gray-600">{option.body}</p>
              {option.cta &&
                (option.cta.to ? (
                  <Link
                    to={option.cta.to}
                    className="text-accent font-bold uppercase text-xs tracking-widest hover:underline mt-auto"
                  >
                    {option.cta.label}
                  </Link>
                ) : (
                  <a
                    href={option.cta.href}
                    className="text-accent font-bold uppercase text-xs tracking-widest hover:underline mt-auto"
                  >
                    {option.cta.label}
                  </a>
                ))}
              {option.socials && (
                <div className="flex space-x-4 mt-auto">
                  {option.socials.map((icon, i) => (
                    <a key={i} href="#" className="text-accent text-lg hover:opacity-70" aria-label="Social link">
                      <FontAwesomeIcon icon={icon} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="volunteer-form" className="py-24 px-6 bg-canvas">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-lavender text-accent rounded-full text-xs font-bold uppercase tracking-widest w-fit">
                <FontAwesomeIcon icon={faHandHoldingHeart} className="text-sm" aria-hidden="true" />
                Get Involved
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-accent leading-tight">
                Get Involved. <span className="font-script">Make an Impact.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Whether you want to volunteer your time, partner with us, support a programme or share your
                professional skills, there&apos;s a place for you at Shipshape Minds.
              </p>
              <p className="font-script text-xl text-ink/80 border-l-4 border-accent pl-5">
                Together, we can create safer spaces and brighter futures for children and young people.
              </p>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute left-7 top-8 bottom-8 w-px bg-line" aria-hidden="true" />
              <ol className="space-y-6">
                {volunteerSteps.map((step, i) => (
                  <li key={step.title} className="relative flex gap-5">
                    <div className="relative z-10 shrink-0 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-md">
                      <span className="text-lg font-bold">{i + 1}</span>
                    </div>
                    <div className="group flex-1 bg-white border border-lavender rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-8 rounded-full bg-lavender text-accent flex items-center justify-center text-sm group-hover:bg-accent group-hover:text-white transition-colors">
                          <FontAwesomeIcon icon={step.icon} aria-hidden="true" />
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-accent/70">Step {i + 1}</span>
                      </div>
                      <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                      <p className="text-gray-600 mt-1">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="bg-white rounded-jumbo p-8 md:p-10 shadow-xl shadow-accent/5 border border-lavender">
            <GetInvolvedForm />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold text-accent mb-6">Not sure where to start?</h2>
        <p className="text-gray-600 mb-10 max-w-xl mx-auto">
          Send us a quick message and our team will get in touch to find the best way for you to help.
        </p>
        <Link to="/contact" className="inline-block border-2 border-accent text-accent px-10 py-4 rounded-full font-bold hover:bg-accent hover:text-white transition-all">
          Contact Our Team
        </Link>
      </section>
    </>
  )
}