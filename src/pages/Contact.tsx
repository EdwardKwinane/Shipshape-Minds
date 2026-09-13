import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'
import { siteConfig } from '../siteConfig'

const subjectOptions = [
  'General Inquiry',
  'Volunteer Opportunity',
  'Donation Question',
  'Partnership Proposal',
  'Media & Press',
]

const socialLinks = [
  { icon: faFacebookF, label: 'Facebook' },
  { icon: faInstagram, label: 'Instagram' },
  { icon: faTwitter, label: 'Twitter' },
  { icon: faLinkedinIn, label: 'LinkedIn' },
]

export default function Contact() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 bg-canvas text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-accent">Contact Us</h1>
          <p className="font-script text-2xl text-gray-500">We'd love to hear from you</p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question about our programs, or want to learn how you can help? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-accent">Get in Touch</h2>
              <p className="text-lg text-gray-600">
                Our team is here to support you and answer any questions you may have about our mission and impact.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-lavender text-accent rounded-2xl flex items-center justify-center text-xl shrink-0">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-lg mb-1">Phone</h4>
                  <p className="text-gray-600">{siteConfig.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-lavender text-accent rounded-2xl flex items-center justify-center text-xl shrink-0">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-lg mb-1">Email</h4>
                  <p className="text-gray-600">
                    {siteConfig.emails.map((email) => (
                      <span key={email} className="block">
                        {email}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-canvas rounded-jumbo space-y-4">
              <h4 className="font-bold text-accent">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-12 h-12 bg-white text-accent rounded-full flex items-center justify-center shadow-sm hover:bg-accent hover:text-white transition-all"
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-3xl shadow-2xl shadow-accent/5 border border-line">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-accent uppercase tracking-wider">Full Name</label>
                  <input type="text" required placeholder="John Doe" className="w-full bg-canvas rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-accent uppercase tracking-wider">Email Address</label>
                  <input type="email" required placeholder="john@example.com" className="w-full bg-canvas rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-accent uppercase tracking-wider">Subject</label>
                <select className="w-full bg-canvas rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20">
                  {subjectOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-accent uppercase tracking-wider">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full bg-canvas rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                />
              </div>
              <button className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2">
                <span>Send Message</span>
                <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}