import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ApproachItem {
  number: string
  title: string
  description: string
}

const items: ApproachItem[] = [
  {
    number: '01',
    title: 'Indigenous Knowledge Systems',
    description: 'Drawing from African wisdom traditions and restorative practices that have sustained communities for generations.',
  },
  {
    number: '02',
    title: 'Restorative Practice',
    description: 'Creating spaces for healing, reflection, and renewal that address the whole person, not just the professional role.',
  },
  {
    number: '03',
    title: 'Community-Based Learning',
    description: 'Building collective wisdom through shared experience, deep listening, and authentic connection.',
  },
]

const Approach = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.set(headingRef.current, { opacity: 0, y: 40 })
    gsap.set(itemsRef.current.filter(Boolean), { opacity: 0, y: 50 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }).to(
      itemsRef.current.filter(Boolean),
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
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
      id="approach"
      ref={sectionRef}
      className="w-full py-[120px] px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#F8F4ED' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <h2
          ref={headingRef}
          className="font-display text-[2rem] md:text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-charcoal text-center mb-16"
        >
          Ancient Wisdom for Modern Challenges
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item, index) => (
            <div
              key={item.number}
              ref={(el) => { itemsRef.current[index] = el }}
            >
              <span className="font-display text-[3rem] text-gold leading-none block mb-4">
                {item.number}
              </span>
              <h3 className="font-body font-medium text-lg text-charcoal mb-3">
                {item.title}
              </h3>
              <p className="font-body font-light text-base text-earth leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Approach