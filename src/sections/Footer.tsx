import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.set(footerRef.current?.querySelectorAll('.footer-animate') || [], { opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })

    tl.to(footerRef.current?.querySelectorAll('.footer-animate') || [], {
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    })

    return () => {
      tl.kill()
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      ref={footerRef}
      className="w-full py-20 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#2B2B2B' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Top area */}
        <div className="footer-animate flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <span className="font-body font-medium text-2xl tracking-[0.15em] text-cream">
            IAAL
          </span>
          <div className="flex flex-wrap gap-6 md:gap-8">
            {[
              { label: 'About', target: 'mission' },
              { label: 'Services', target: 'services' },
              { label: 'Philosophy', target: 'approach' },
              { label: 'Contact', target: 'contact' },
            ].map((item) => (
              <a
                key={item.target}
                href={`#${item.target}`}
                onClick={(e) => handleNavClick(e, item.target)}
                className="font-body font-light text-sm transition-colors duration-300 hover:text-gold"
                style={{ color: 'rgba(248, 244, 237, 0.7)' }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Light streak divider */}
        <div className="footer-animate footer-stretch my-10" />

        {/* Bottom area */}
        <div className="footer-animate flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <a
            href="mailto:info@authenticliving.global"
            className="font-body font-light text-sm transition-colors duration-300 hover:text-gold"
            style={{ color: 'rgba(248, 244, 237, 0.6)' }}
          >
            info@authenticliving.global
          </a>
          <span
            className="font-body font-light text-xs"
            style={{ color: 'rgba(248, 244, 237, 0.4)' }}
          >
            &copy; 2026 International Association for Authentic Living
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer