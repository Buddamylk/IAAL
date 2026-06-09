import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  quote: string
  attribution: string
}

const testimonials: Testimonial[] = [
  {
    quote: 'Working with IAAL helped me reconnect to the reason I chose this work in the first place. I remembered who I am.',
    attribution: 'Program Participant',
  },
  {
    quote: 'Miannon creates transformative spaces where people can remember who they are and why they began this journey.',
    attribution: 'Executive Director',
  },
  {
    quote: 'Our team emerged with renewed clarity, trust, and commitment. The experience was nothing short of profound.',
    attribution: 'Nonprofit Leadership Team',
  },
]

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    gsap.set(contentRef.current, { opacity: 0, y: 30 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    })

    return () => {
      tl.kill()
    }
  }, [])

  const goTo = (index: number) => {
    if (index === current) return
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 15,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(index)
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        })
      },
    })
  }

  const goNext = () => {
    goTo((current + 1) % testimonials.length)
  }

  const goPrev = () => {
    goTo((current - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="w-full py-[120px] px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#F8F4ED' }}
    >
      <div className="max-w-[1000px] mx-auto text-center">
        <span className="font-body font-medium uppercase text-xs tracking-[0.1em] text-gold block mb-12">
          TESTIMONIALS
        </span>

        <div ref={contentRef}>
          <blockquote className="font-display text-xl md:text-[2rem] leading-[1.4] text-charcoal italic mb-8">
            &ldquo;{testimonials[current].quote}&rdquo;
          </blockquote>
          <p className="font-body font-light text-sm text-earth">
            — {testimonials[current].attribution}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={goPrev}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              border: '1px solid rgba(90, 70, 52, 0.3)',
              color: '#5A4634',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#5A4634'
              e.currentTarget.style.color = '#F8F4ED'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#5A4634'
            }}
            aria-label="Previous testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              border: '1px solid rgba(90, 70, 52, 0.3)',
              color: '#5A4634',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#5A4634'
              e.currentTarget.style.color = '#F8F4ED'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#5A4634'
            }}
            aria-label="Next testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials