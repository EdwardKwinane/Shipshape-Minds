import { useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain, faHeart, faBars } from '@fortawesome/free-solid-svg-icons'
import { navLinks } from '../siteConfig'

export default function Navbar() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-gray-100">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white">
          <FontAwesomeIcon icon={faBrain} />
        </div>
        <div className="leading-none">
          <h1 className="text-xl font-bold tracking-tight text-accent uppercase">Shipshape Minds</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Planting Seeds of Hope</p>
        </div>
      </Link>

      <div className="hidden lg:flex items-center space-x-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `nav-link text-sm font-medium ${isActive ? 'active-link' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center space-x-3">
        <Link
          to="/donate"
          className="hidden sm:flex bg-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all items-center"
        >
          <FontAwesomeIcon icon={faHeart} className="mr-2" />
          Donate Now
        </Link>

        <button
          onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-accent hover:bg-accent/10 transition-colors"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <div id="mobile-menu" className="hidden lg:hidden fixed top-16 left-0 right-0 bg-white shadow-xl border-b border-line rounded-b-3xl px-6 py-6 space-y-4">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
            className={({ isActive }) =>
              `block text-lg font-medium py-1 ${isActive ? 'text-accent font-bold' : 'text-gray-700'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <Link
          to="/donate"
          onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
          className="block text-center bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold"
        >
          Donate Now
        </Link>
      </div>
    </nav>
  )
}