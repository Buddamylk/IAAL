import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Service {
  icon: string
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: '/images/icon-leadership.png',
    title: 'Leadership Renewal',
    description: 'Helping leaders reconnect with purpose, inspiration, and sustainable practices for long-term effectiveness.',
  },
  {
    icon: '/images/icon-organization.png',
    title: 'Organizational Alignment',
    description: 'Supporting nonprofits and mission-driven organizations in reconnecting with their mission, values, and culture.',
  },
  {
    icon: '/images/icon-strategy.png',
    title: 'Strategic Guidance',
    description: 'Facilitating thoughtful planning, innovation, and systems-level transformation.',
  },
  {
    icon: '/images/icon-reflection.png',
    title: 'Executive Reflection',
    description: 'One-on-one facilitated conversations for leaders navigating complexity, transition, or burnout.',
  },
]

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.set(headerRef.current, { opacity: 0, y: 40 })
    gsap.set(cardsRef.current.filter(Boolean), { opacity: 0, y: 60 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }).to(
      cardsRef.current.filter(Boolean),
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      },
      '-=0.4'
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full py-[120px] px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#F8F4ED' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div ref={headerRef} className="mb-16">
          <span className="font-body font-medium uppercase text-xs tracking-[0.1em] text-gold block mb-4">
            HOW WE SERVE
          </span>
          <h2 className="font-display text-[2rem] md:text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-charcoal">
            Leadership That Begins Within
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => { cardsRef.current[index] = el }}
              className="pt-8"
              style={{ borderTop: '1px solid rgba(90, 70, 52, 0.15)' }}
            >
              <img
                src={service.icon}
                alt={service.title}
                className="w-12 h-12 mb-6 object-contain"
                style={{ filter: 'brightness(0) saturate(100%) invert(55%) sepia(8%) saturate(824%) hue-rotate(52deg) brightness(94%) contrast(88%)' }}
              />
              <h3 className="font-body font-medium text-lg text-charcoal mb-3">
                {service.title}
              </h3>
              <p className="font-body font-light text-base text-earth leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services