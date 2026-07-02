'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle, LogOut } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const staticNavItems = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <header className="sticky top-0 z-50 bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)]">
      <nav className="mx-auto flex min-h-[76px] w-full max-w-[var(--editable-container)] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-[6px] border border-white/15 text-[var(--slot4-accent)] transition group-hover:border-[var(--slot4-accent)]">
            <span className="text-2xl leading-none">
              <img src="/favicon.ico" alt="favicon.ico" className="h-8 w-8" />
            </span>
          </span>
          <span className="min-w-0">
            <span className="editable-display block max-w-[210px] truncate text-xl leading-none text-white">{SITE_CONFIG.name}</span>
            <span className="editable-mono mt-1 hidden max-w-[220px] truncate text-[0.72rem] uppercase tracking-[0.1em] text-white/55 sm:block">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="mx-auto hidden items-center gap-8 lg:flex">
          {staticNavItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition ${active ? 'text-[var(--slot4-accent)]' : 'text-white/78 hover:text-white'}`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="grid h-11 w-11 place-items-center rounded-[6px] border border-white/20 text-white transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
          >
            <Search className="h-4 w-4" />
          </Link>

          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-[6px] bg-[var(--editable-cta-bg)] px-4 py-3 text-sm font-semibold text-[var(--editable-cta-text)] transition hover:brightness-105 sm:inline-flex"
              >
                <PlusCircle className="h-4 w-4" /> Submit
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center gap-2 rounded-[6px] border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/60 sm:inline-flex"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-[6px] border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/60 sm:inline-flex"
              >
                <LogIn className="h-4 w-4" /> Sign in
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-[6px] bg-[var(--editable-cta-bg)] px-4 py-3 text-sm font-semibold text-[var(--editable-cta-text)] transition hover:brightness-105 sm:inline-flex"
              >
                <UserPlus className="h-4 w-4" /> Get started
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-[6px] border border-white/20 text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[var(--editable-nav-bg)] px-4 py-5 lg:hidden">
          <div className="grid gap-2">
            {staticNavItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-[6px] px-4 py-3 text-sm font-semibold ${active ? 'bg-[var(--slot4-accent)] text-[var(--slot4-on-accent)]' : 'text-white/75 hover:bg-white/5 hover:text-white'}`}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link href="/search" onClick={() => setOpen(false)} className="rounded-[6px] px-4 py-3 text-sm font-semibold text-white/75 hover:bg-white/5 hover:text-white">
              Search
            </Link>
            {session ? (
              <>
                <Link href="/create" onClick={() => setOpen(false)} className="rounded-[6px] px-4 py-3 text-sm font-semibold text-white/75 hover:bg-white/5 hover:text-white">
                  Submit
                </Link>
                <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-[6px] px-4 py-3 text-left text-sm font-semibold text-white/75 hover:bg-white/5 hover:text-white">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-[6px] px-4 py-3 text-sm font-semibold text-white/75 hover:bg-white/5 hover:text-white">
                  Sign in
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="rounded-[6px] bg-[var(--slot4-accent)] px-4 py-3 text-sm font-semibold text-[var(--slot4-on-accent)]">
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
