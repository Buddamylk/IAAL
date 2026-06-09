import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Founder = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textElementsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    gsap.set(imageRef.current, { opacity: 0, x: -60 })
    gsap.set(textElementsRef.current.filter(Boolean), { opacity: 0, x: 40 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    tl.to(imageRef.current, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
    }).to(
      textElementsRef.current.filter(Boolean),
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      },
      '-=0.6'
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="w-full py-[120px] px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#2B2B2B' }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Image */}
        <div
          ref={imageRef}
          className="w-full lg:w-[45%]"
        >
          <div className="relative overflow-hidden">
            <img
              src="/images/founder-portrait.jpg"
              alt="Miannon Dabe Agbeyinhoun, Founder of IAAL"
              className="w-full h-auto object-cover"
              style={{ maxHeight: '600px' }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: 'rgba(90, 70, 52, 0.15)' }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="w-full lg:w-[50%] lg:pl-[60px]">
          <span
            ref={(el) => { textElementsRef.current[0] = el }}
            className="font-body font-medium uppercase text-xs tracking-[0.1em] text-gold block mb-4"
          >
            OUR FOUNDER
          </span>
          <h2
            ref={(el) => { textElementsRef.current[1] = el }}
            className="font-display text-[2rem] md:text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-cream mb-3"
          >
            Miannon Dabe Agbeyinhoun
          </h2>
          <p
            ref={(el) => { textElementsRef.current[2] = el }}
            className="font-body font-medium text-base text-sage mb-8"
          >
            Chief Facilitating Officer
          </p>
          <div className="space-y-5">
            <p
              ref={(el) => { textElementsRef.current[3] = el }}
              className="font-body font-light text-base leading-[1.7]"
              style={{ color: 'rgba(248, 244, 237, 0.85)' }}
            >
              Miannon Dabe Agbeyinhoun is the founder of the International Association for Authentic Living
              and a globally respected guide for heart-centered leaders. An iconoclast, visionary, and
              transformational facilitator, Miannon specializes in helping individuals and organizations
              return to their deepest source of wisdom, inspiration, and authenticity.
            </p>
            <p
              ref={(el) => { textElementsRef.current[4] = el }}
              className="font-body font-light text-base leading-[1.7]"
              style={{ color: 'rgba(248, 244, 237, 0.85)' }}
            >
              Drawing from African indigenous restorative practices, community-centered traditions,
              leadership development, and decades of experience supporting mission-driven organizations,
              Miannon creates spaces where leaders can reconnect with themselves and remember why they began.
            </p>
            <p
              ref={(el) => { textElementsRef.current[5] = el }}
              className="font-body font-light text-base leading-[1.7]"
              style={{ color: 'rgba(248, 244, 237, 0.85)' }}
            >
              Her work bridges ancient wisdom and modern leadership challenges, offering practical
              pathways toward renewal, resilience, and meaningful impact.
           </p>
          </div>
          
            href="https://books2read.com/Thegreatmoment"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 px-8 py-3 font-body font-medium text-sm tracking-[0.05em] text-cream border border-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            More About "The Great Moment"
          </a>
        </div>
      </div>
    </section>
  )
}

export default Founder
