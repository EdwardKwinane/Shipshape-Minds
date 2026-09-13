import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling, faHeart, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { images } from '../assets/images'

const stats = [
  { value: '250+', label: 'Children Reached' },
  { value: '15+', label: 'Schools Supported' },
  { value: '100+', label: 'Families Assisted' },
]

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <header className="pt-40 pb-20 px-6 bg-canvas overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-7xl font-bold text-accent leading-none tracking-tight">
              About <br />
              <span className="text-ink">Shipshape Minds</span>
            </h1>
            <div className="flex items-center space-x-4">
              <p className="font-script text-2xl text-gray-500">Planting seeds of hope beyond circumstances</p>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Shipshape Minds is a community-focused Non-Profit Organisation dedicated to supporting children, young people, and vulnerable communities through mental health, emotional wellness, and social development initiatives.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/programs" className="bg-accent text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-80 transition-all">
                Our Programs
              </Link>
              <Link to="/donate" className="border-2 border-accent text-accent px-8 py-3 rounded-full font-bold hover:bg-accent hover:text-white transition-all">
                Support Our Mission
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover"
                src={images.aboutHero}
                alt="A smiling child outdoors in natural light"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Marquee */}
      <div className="py-8 bg-accent overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="text-2xl font-bold text-white uppercase tracking-widest px-8">
              Planting Seeds of Hope
            </span>
          ))}
        </div>
      </div>

      {/* Creating Safe Spaces */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-[3rem] overflow-hidden h-[600px] shadow-xl">
                <img
                  className="w-full h-full object-cover"
                  src={images.unityHands}
                  alt="Children's hands together in a circle, representing unity and a safe community space"
                />
              </div>
            </div>
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-accent">Creating Safe Spaces for Healing and Growth</h2>
                <p className="text-lg text-gray-600">
                  Many children face challenges such as isolation, anxiety, neglect, and trauma. Shipshape Minds works closely with schools, communities, and partners to create environments where children can express themselves safely.
                </p>
              </div>

              <div className="bg-accent text-white p-10 rounded-jumbo relative">
                <FontAwesomeIcon icon={faQuoteLeft} className="text-5xl opacity-20 absolute top-8 left-8" />
                <p className="text-2xl font-medium leading-relaxed italic relative z-10">
                  "Our mission is to bring hope, healing, and opportunities to children who need support the most."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 px-6 bg-canvas">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-12 rounded-jumbo space-y-6 shadow-sm border border-line">
            <div className="w-16 h-16 bg-lavender rounded-full flex items-center justify-center text-accent text-2xl">
              <FontAwesomeIcon icon={faSeedling} />
            </div>
            <h3 className="text-3xl font-bold text-accent">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              A world where every child has access to emotional support, opportunities, and the confidence to build a positive future.
            </p>
          </div>
          <div className="bg-white p-12 rounded-jumbo space-y-6 shadow-sm border border-line">
            <div className="w-16 h-16 bg-lavender rounded-full flex items-center justify-center text-accent text-2xl">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <h3 className="text-3xl font-bold text-accent">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              To provide accessible mental health support, life skills education, and development programmes that empower children and communities.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 px-6 bg-accent text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Our Growing Impact</h2>
            <p className="text-xl opacity-70">Every child matters. Together we are making a difference.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-4">
                <div className="text-7xl font-bold">{stat.value}</div>
                <p className="uppercase text-sm tracking-widest opacity-80 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}