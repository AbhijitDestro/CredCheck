import React from 'react'
import { Star } from 'lucide-react'
import { motion as Motion } from 'framer-motion'

const stars = (
  <div className="flex">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
    ))}
  </div>
)

const Testimonials = () => {
  const items = [
    {
      quote:
        'CredCheck cut our verification turnaround from days to minutes. Reliable and effortless.',
      name: 'Sarah Johnson',
      role: 'HR Manager, Northbridge Corp',
      avatar:
        'https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png',
    },
    {
      quote:
        'As a registrar, I value integrity. CredCheck delivers tamper‑proof verification every time.',
      name: 'David Kim',
      role: 'University Registrar',
      avatar:
        'https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png',
    },
    {
      quote:
        'We hire faster now—verification results are instant and trusted by our partners.',
      name: 'Emily Rodriguez',
      role: 'Talent Lead, Horizon Labs',
      avatar:
        'https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png',
    },
  ]

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Trusted by institutions and employers worldwide
          </p>
        </div>

        <Motion.div
          className="grid max-w-lg grid-cols-1 gap-6 mx-auto mt-10 md:max-w-none lg:gap-8 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
        >
          {items.map((t, idx) => (
            <Motion.div
              key={idx}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              variants={{ hidden: { y: 12, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col justify-between flex-1 p-6 lg:py-8 lg:px-7">
                <div className="flex-1">
                  {stars}
                  <blockquote className="flex-1 mt-6">
                    <p className="text-lg leading-relaxed text-gray-900">
                      “{t.quote}”
                    </p>
                  </blockquote>
                </div>
                <div className="flex items-center mt-8">
                  <img
                    className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                    src={t.avatar}
                    alt={t.name}
                  />
                  <div className="ml-4">
                    <p className="text-base font-bold text-gray-900">{t.name}</p>
                    <p className="mt-0.5 text-sm text-gray-600">{t.role}</p>
                  </div>
                </div>
              </div>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}

export default Testimonials
