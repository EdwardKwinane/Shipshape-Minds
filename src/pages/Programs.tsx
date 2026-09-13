import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeartPulse,
  faSchool,
  faHandHoldingHand,
  faStar,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons'

const programCategories = [
  {
    number: '01',
    icon: faHeartPulse,
    title: 'Mental Health & Emotional Support',
    intro: 'We provide programs that encourage children to:',
    items: [
      'Talk about their feelings',
      'Manage emotions effectively',
      'Develop essential coping skills',
      'Build lasting self-confidence',
      'Improve overall emotional wellbeing',
    ],
  },
  {
    number: '02',
    icon: faSchool,
    title: 'School Partnerships',
    intro: 'Working alongside schools to:',
    items: [
      'Identify learner challenges early',
      'Promote emotional wellbeing in class',
      'Encourage positive behavior',
      'Support personal growth and development',
      'Strengthen safe learning environments',
    ],
  },
  {
    number: '03',
    icon: faHandHoldingHand,
    title: 'Child Support & Community Assistance',
    intro: 'Supporting children and families through:',
    items: [
      'Food Parcel Donations',
      'School Uniform Support',
      'Basic Needs Assistance',
      'Professional Counseling Referrals',
      'Community Outreach Programmes',
    ],
  },
  {
    number: '04',
    icon: faStar,
    title: 'Life Skills & Personal Development',
    intro: 'Helping young people develop skills for:',
    items: [
      'Further Education & Learning',
      'Leadership & Teamwork',
      'Employment & Career Readiness',
      'Confident Decision Making',
      'Future Success & Sustainability',
    ],
  },
]

function ProgramCard({ program }: { program: (typeof programCategories)[number] }) {
  return (
    <div className="p-8 md:p-12 border border-line rounded-jumbo space-y-8 hover:bg-canvas transition-colors">
      <div className="flex items-start justify-between">
        <div className="w-16 h-16 bg-lavender rounded-2xl flex items-center justify-center text-accent text-3xl">
          <FontAwesomeIcon icon={program.icon} />
        </div>
        <span className="text-4xl font-bold text-lavender">{program.number}</span>
      </div>
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-accent">{program.title}</h3>
        <p className="text-gray-600">{program.intro}</p>
        <ul className="space-y-3">
          {program.items.map((item) => (
            <li key={item} className="flex items-center space-x-3 text-gray-600">
              <FontAwesomeIcon icon={faCircleCheck} className="text-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Programs() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 bg-canvas text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-accent">Our Programs</h1>
          <p className="font-script text-2xl text-gray-500">Empowering Children. Strengthening Communities.</p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive programs designed to nurture the mental, emotional, and social development of young people through every stage of their journey.
          </p>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {programCategories.map((program) => (
            <ProgramCard key={program.number} program={program} />
          ))}
        </div>
      </section>

      {/* Support Mission CTA */}
      <section className="py-24 px-6 bg-accent text-white">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">Help Us Grow Our Impact</h2>
          <p className="text-xl opacity-80">
            Our programs are only possible through the generous support of our community. Join us in making a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/donate" className="bg-white text-accent px-10 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all">
              Donate to a Program
            </Link>
            <Link to="/get-involved" className="border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-accent transition-all">
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}