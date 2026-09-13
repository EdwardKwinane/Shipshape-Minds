import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'
import { navLinks, siteConfig } from '../siteConfig'

const programLinks = [
  'Mental Health Support',
  'Life Skills Development',
  'Child Protection Awareness',
  'Food & Basic Support',
  'School & Community Outreach',
]

const socialLinks = [
  { icon: faFacebookF, label: 'Facebook', href: siteConfig.social.facebook },
  { icon: faInstagram, label: 'Instagram', href: siteConfig.social.instagram },
  { icon: faTwitter, label: 'Twitter', href: siteConfig.social.twitter },
  { icon: faLinkedinIn, label: 'LinkedIn', href: siteConfig.social.linkedin },
]

export default function Footer() {
  return (
    <footer className="bg-accent text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white text-accent rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faBrain} className="text-sm" />
              </div>
              <h2 className="text-xl font-bold tracking-tight uppercase">Shipshape Minds</h2>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Planting seeds of hope beyond circumstances. Dedicated to nurturing the potential of every child through community-focused initiatives.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-accent transition-all"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 opacity-70 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Our Programs</h4>
            <ul className="space-y-3 opacity-70 text-sm">
              {programLinks.map((name) => (
                <li key={name}>
                  <Link to="/programs" className="hover:underline">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Join Our Newsletter</h4>
            <p className="text-sm opacity-70 mb-4">Stay updated with our latest news and impact stories.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white w-full"
              />
              <button type="submit" className="bg-white text-accent px-4 py-2 rounded-lg text-sm font-bold">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50 uppercase tracking-widest">
          <p>
            © {siteConfig.copyrightYear} Shipshape Minds NPO · Reg. No. {siteConfig.companyNumber} · All rights reserved.
          </p>
          <p>Empowering minds. Protecting childhoods. Building a better tomorrow.</p>
        </div>
      </div>
    </footer>
  )
}