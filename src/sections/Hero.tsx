import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const chevronRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.7')
    .to(chevronRef.current, {
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
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#F8F4ED' }}
    >
      {/* Video background layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero-bg.jpg"
        >
          <source src="/videos/hero-ambient.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(248, 244, 237, 0.55)' }}
        />
      </div>

      {/* Aurora dome layer */}
      <div className="aurora-container">
        <div className="aurora-dome" />
        <div className="aurora-fade" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[900px] mx-auto">
        <h1
          ref={headlineRef}
          className="font-display text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] leading-[1.1] tracking-[-0.02em] text-charcoal mb-6"
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            textShadow: '0 2px 30px rgba(248, 244, 237, 0.6)',
          }}
        >
          Reconnect to the Heart of Your Leadership
        </h1>
        <p
          ref={subtitleRef}
          className="font-body font-light text-lg md:text-xl text-earth max-w-[560px] mx-auto"
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          Heart-centered leadership development for a world in transition
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={chevronRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator"
        style={{ opacity: 0 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5A4634"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}

export default Hero