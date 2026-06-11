import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    gsap.set([headingRef.current, subtextRef.current], { opacity: 0, y: 30 })
    gsap.set(buttonRef.current, { opacity: 0 })

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
    })
    .to(subtextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.55')
    .to(buttonRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.3')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-[120px] px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#5A4634' }}
    >
      <div className="max-w-[800px] mx-auto text-center">
        <h2
          ref={headingRef}
          className="font-display text-[2rem] md:text-[3rem] leading-[1.1] tracking-[-0.02em] text-cream mb-6"
        >
          Ready to Reconnect?
        </h2>
        <p
          ref={subtextRef}
          className="font-body font-light text-lg leading-relaxed max-w-[560px] mx-auto mb-10"
          style={{ color: 'rgba(248, 244, 237, 0.85)' }}
        >
          The world needs leaders who are whole. Let us help you remember who you are.
        </p>
        <a
          ref={buttonRef}
          href="mailto:MiannonDabe@proton.me?subject=Discovery%20Conversation%20Request"
          className="inline-block font-body font-medium text-base px-10 py-4 transition-all duration-300"
          style={{
            backgroundColor: '#C79A43',
            color: 'white',
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          Contact Us
        </a>
      </div>
    </section>
  )
}

export default Contact
