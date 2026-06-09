import { useEffect, useRef, useState } from 'react'

const Navigation = () => {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY

      if (currentY > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      if (currentY > lastScrollY.current && currentY > 200) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        backgroundColor: 'rgba(248, 244, 237, 0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: scrolled ? '1px solid rgba(90, 70, 52, 0.1)' : '1px solid transparent',
      }}
    >
      <div className="flex items-center justify-between h-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <a
          href="#"
          className="font-body font-medium uppercase tracking-[0.15em] text-earth text-sm"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          IAAL
        </a>
        <div className="hidden md:flex items-center gap-8">
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
              className="font-body font-light text-sm text-earth hover:text-gold transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation