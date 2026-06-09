import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Mission = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const elements = [labelRef.current, quoteRef.current, textRef.current]

    gsap.set(elements, { opacity: 0, y: 40 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="w-full py-[120px] px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#F8F4ED' }}
    >
      <div className="max-w-[720px] mx-auto text-center">
        <span
          ref={labelRef}
          className="font-body font-medium uppercase text-xs tracking-[0.1em] text-gold block mb-8"
        >
          OUR MISSION
        </span>
        <blockquote
          ref={quoteRef}
          className="font-display text-2xl md:text-[2.5rem] leading-[1.3] text-charcoal italic mb-10"
        >
          &ldquo;If you separate your heart from your being, you die.&rdquo;
        </blockquote>
        <p
          ref={textRef}
          className="font-body font-light text-base text-earth leading-relaxed"
        >
          The International Association for Authentic Living helps leaders who have become disconnected
          from their original inspiration return to their deepest source of wisdom. Through strategic
          guidance, African indigenous restorative practices, and leadership development, we help you
          remember who you are.
        </p>
      </div>
    </section>
  )
}

export default Mission