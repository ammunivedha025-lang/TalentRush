import { useEffect } from 'react'

export default function LiquidEnvironment() {
  useEffect(() => {
    const root = document.documentElement
    const onMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2
      root.style.setProperty('--mx', `${x}`)
      root.style.setProperty('--my', `${y}`)
    }
    const onScroll = () => {
      root.style.setProperty('--scroll-y', `${window.scrollY || 0}`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="liquid-environment" aria-hidden="true">
      <div className="liquid-orb orb-a" />
      <div className="liquid-orb orb-b" />
      <div className="liquid-orb orb-c" />
      <div className="liquid-orb orb-d" />
      <div className="liquid-noise" />
    </div>
  )
}
