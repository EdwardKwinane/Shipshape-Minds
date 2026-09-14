import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeartPulse,
  faGraduationCap,
  faUsers,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { images } from '../assets/images'

const focusAreas = [
  {
    icon: faHeartPulse,
    title: 'Mental Health',
    body: 'Providing accessible mental health support and life skills education that empower children to thrive.',
    accent: false,
  },
  {
    icon: faGraduationCap,
    title: 'Educational Partnerships',
    body: 'Working closely with schools and communities to create environments for growth and learning.',
    accent: true,
  },
  {
    icon: faUsers,
    title: 'Community Outreach',
    body: 'Connecting children and families with practical and emotional assistance through our networks.',
    accent: false,
  },
]

const programs = [
  { img: images.emotional, title: 'Emotional Wellbeing', body: 'Helping children talk about and manage their feelings.' },
  { img: images.school, title: 'School Support', body: 'Promoting positive behavior and growth in schools.' },
  { img: images.basicNeeds, title: 'Basic Needs', body: 'Assisting families with food parcels and school uniforms.' },
  { img: images.lifeSkills, title: 'Life Skills', body: 'Developing leadership and future readiness in youth.' },
]

const stats = [
  { value: '250+', label: 'Children Reached' },
  { value: '15+', label: 'Schools Supported' },
  { value: '100+', label: 'Families Assisted' },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 gradient-bg min-h-[800px] flex items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-lavender text-accent rounded-full text-xs font-bold uppercase tracking-widest">
              Welcome to Shipshape Minds
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-accent leading-tight">
              Empowering Young Minds for a <span className="text-ink">Brighter Future</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Dedicated to supporting children, young people, and vulnerable communities through mental health, emotional wellness, and social development initiatives.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/programs" className="bg-accent text-white px-10 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all">
                Our Programs
              </Link>
              <Link to="/about" className="border-2 border-accent text-accent px-10 py-4 rounded-full font-bold hover:bg-accent hover:text-white transition-all">
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-lavender rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-accent/10 rounded-full opacity-50 blur-3xl"></div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-accent/20">
              <img
                className="w-full h-[600px] object-cover"
                src={images.hero}
                alt="Happy African children participating in a Shipshape Minds youth programme"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Areas */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-accent">What We Focus On</h2>
            <p className="font-script text-xl text-gray-500">Planting seeds of hope beyond circumstances</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className={`p-10 rounded-jumbo space-y-6 hover:shadow-xl transition-shadow ${area.accent ? 'bg-lavender' : 'bg-canvas'}`}
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-accent text-2xl shadow-sm">
                  <FontAwesomeIcon icon={area.icon} />
                </div>
                <h3 className="text-2xl font-bold text-accent">{area.title}</h3>
                <p className="text-gray-600 leading-relaxed">{area.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Programs Preview */}
      <section className="py-24 px-6 bg-canvas">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-accent tracking-tight">Our Programs</h2>
              <p className="text-gray-600 max-w-xl">
                Explore our diverse range of initiatives designed to support every aspect of a child's development.
              </p>
            </div>
            <Link to="/programs" className="text-accent font-bold uppercase text-sm tracking-widest flex items-center hover:opacity-70 transition-opacity">
              View All Programs <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program) => (
              <div key={program.title} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    src={program.img}
                    alt={program.title}
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="text-lg font-bold text-accent">{program.title}</h4>
                  <p className="text-sm text-gray-500">{program.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 px-6 bg-accent text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`space-y-4 ${index === 1 ? 'border-y md:border-y-0 md:border-x border-white/20 py-8 md:py-0' : ''}`}>
              <div className="text-6xl font-bold">{stat.value}</div>
              <p className="uppercase text-sm tracking-widest opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Support Mission CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-lavender rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-accent leading-tight">
              Together, We Can Create Brighter Futures
            </h2>
            <p className="text-lg text-gray-600">
              Your support helps us provide emotional support, educational opportunities, and essential resources to children who need them most.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/donate" className="bg-accent text-white px-8 py-3 rounded-full font-bold transition-all hover:bg-opacity-90">
                Donate Now
              </Link>
              <Link to="/get-involved" className="bg-white text-accent px-8 py-3 rounded-full font-bold shadow-sm">
                Become a Volunteer
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                className="w-full h-[300px] object-cover"
                src={images.ctaKids}
                alt="Smiling children of diverse backgrounds together, representing a hopeful future"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}