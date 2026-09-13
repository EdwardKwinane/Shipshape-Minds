import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldHeart, faReceipt } from '@fortawesome/free-solid-svg-icons'

const frequencyOptions = ['Once', 'Monthly'] as const
const amounts = [20, 50, 100]

const impactCards = [
  {
    amount: 'R20',
    title: 'Educational Supplies',
    body: 'Provides essential learning materials and a school uniform for one child for an entire semester.',
    accent: false,
  },
  {
    amount: 'R50',
    title: 'Mental Health Support',
    body: 'Funds three professional counseling sessions for a child experiencing emotional distress or trauma.',
    accent: true,
  },
  {
    amount: 'R100',
    title: 'Family Food Parcel',
    body: 'Supplies a vulnerable family of four with nutritious food parcels for one full month.',
    accent: false,
  },
]

const faqs = [
  {
    q: 'Can I donate from outside the country?',
    a: "Yes, we accept international donations via credit card and PayPal. The amount will be converted at your bank's current rate.",
  },
  {
    q: 'How can I cancel a monthly donation?',
    a: 'You can cancel your monthly recurring donation at any time by contacting our support team or through your user portal.',
  },
  {
    q: 'Will I receive a tax certificate?',
    a: 'Absolutely. We issue Section 18A tax certificates for all donations over R10 made during the financial year.',
  },
]

export default function Donations() {
  const [frequency, setFrequency] = useState<(typeof frequencyOptions)[number]>('Once')
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState('')

  return (
    <>
      {/* Hero / Donation Section */}
      <section className="pt-40 pb-24 px-6 bg-canvas">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-accent leading-tight">
              Every Seed Planted <br />
              <span className="text-ink">Changes a Life</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Your contribution directly supports our mental health programs, provides food parcels for families, and ensures every child has the tools they need to succeed.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 p-6 bg-white rounded-3xl shadow-sm">
                <div className="w-12 h-12 bg-lavender text-accent rounded-2xl flex items-center justify-center text-xl shrink-0">
                  <FontAwesomeIcon icon={faShieldHeart} />
                </div>
                <div>
                  <h4 className="font-bold text-accent mb-1">Safe & Secure</h4>
                  <p className="text-sm text-gray-500">Your donation is encrypted and processed securely.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-6 bg-white rounded-3xl shadow-sm">
                <div className="w-12 h-12 bg-lavender text-accent rounded-2xl flex items-center justify-center text-xl shrink-0">
                  <FontAwesomeIcon icon={faReceipt} />
                </div>
                <div>
                  <h4 className="font-bold text-accent mb-1">Tax Deductible</h4>
                  <p className="text-sm text-gray-500">Receive a tax receipt for every donation made.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-2xl shadow-accent/5 border border-line">
            <div className="space-y-8">
              <div className="flex bg-canvas p-1.5 rounded-2xl">
                {frequencyOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFrequency(option)}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                      frequency === option ? 'bg-accent text-white' : 'text-gray-400 hover:text-accent'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount)
                      setCustomAmount('')
                    }}
                    className={`py-4 border-2 rounded-2xl font-bold text-accent transition-all ${
                      selectedAmount === amount ? 'border-accent bg-canvas' : 'border-line hover:border-accent hover:bg-canvas'
                    }`}
                  >
                    R{amount}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-accent uppercase tracking-wider">Custom Amount (R)</label>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-canvas rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent/20 font-bold text-lg"
                />
              </div>

              <div className="space-y-4">
                <button className="w-full bg-accent text-white py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center shadow-lg shadow-accent/20">
                  Complete Donation
                </button>
                <p className="text-center text-xs text-gray-400">
                  By donating, you agree to our <a href="#" className="underline">Terms of Service</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Cards */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-accent">Where Your Money Goes</h2>
            <p className="font-script text-xl text-gray-500">Every rand makes a tangible difference</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactCards.map((card) => (
              <div
                key={card.title}
                className={`p-10 rounded-jumbo space-y-6 ${card.accent ? 'bg-accent text-white shadow-xl shadow-accent/20' : 'border border-line'}`}
              >
                <h4 className={`text-6xl font-bold ${card.accent ? 'opacity-30' : 'text-lavender'}`}>{card.amount}</h4>
                <h3 className={`text-2xl font-bold ${card.accent ? '' : 'text-accent'}`}>{card.title}</h3>
                <p className={card.accent ? 'opacity-80 leading-relaxed' : 'text-gray-600 leading-relaxed'}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Questions */}
      <section className="py-24 px-6 bg-canvas">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-accent text-center mb-12">Donation FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white p-6 rounded-2xl shadow-sm">
                <h4 className="font-bold text-accent mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}