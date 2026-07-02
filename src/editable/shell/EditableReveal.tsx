'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'

type EditableRevealProps = {
  children: ReactNode
  className?: string
  index?: number
}

export function EditableReveal({ children, className = '', index = 0 }: EditableRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.16 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`editable-reveal ${visible ? 'is-visible' : ''} ${className}`}
      data-mounted={mounted ? 'true' : undefined}
      style={{ transitionDelay: mounted ? `${Math.min(index, 8) * 80}ms` : undefined }}
    >
      {children}
    </div>
  )
}
