import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faUserGroup, faHandshake, faBullhorn } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'

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
  'Submit your application form',
  'Attend an orientation session',
  'Start making an impact',
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

      {/* Volunteer Section */}
      <section id="volunteer-form" className="py-24 px-6 bg-canvas">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-accent leading-tight">Become a Volunteer</h2>
            <p className="text-lg text-gray-600">
              Our volunteers are the heartbeat of Shipshape Minds. From mentoring to event support, there's a place for your skills here.
            </p>
            <div className="space-y-4">
              {volunteerSteps.map((step, i) => (
                <div key={step} className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm">
                  <div className="w-10 h-10 bg-lavender text-accent rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <p className="font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-accent/5">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-accent uppercase tracking-wider">First Name</label>
                  <input type="text" required className="w-full bg-canvas rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-accent uppercase tracking-wider">Last Name</label>
                  <input type="text" required className="w-full bg-canvas rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-accent uppercase tracking-wider">Email Address</label>
                <input type="email" required className="w-full bg-canvas rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-accent uppercase tracking-wider">Interest Area</label>
                <select className="w-full bg-canvas rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20">
                  <option>Mentoring & Support</option>
                  <option>Event Volunteering</option>
                  <option>Admin & Back Office</option>
                  <option>Marketing & Outreach</option>
                </select>
              </div>
              <button className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all">
                Submit Application
              </button>
            </form>
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