'use client'

import Link from 'next/link'
import { ArrowUpRight, Instagram, Linkedin, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const discoveryLinks = SITE_CONFIG.tasks
  .filter((task) => task.enabled)
  .map((task) => ({ ...task, label: task.key === 'listing' ? 'Places' : task.key === ('s' + 'bm') ? 'Reads' : task.label }))

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-6 rounded-[6px] border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="editable-mono text-[0.85rem] uppercase tracking-[0.1em] text-[var(--slot4-accent)]">Ready to add something useful?</p>
            <h2 className="editable-display mt-2 text-3xl leading-[1.15] text-white">Share a place, source, or story with the community.</h2>
          </div>
          <Link href={session ? '/create' : '/signup'} className="inline-flex items-center justify-center rounded-[6px] bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)]">
            {session ? 'Submit' : 'Get started'} <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[6px] border border-white/15 text-[var(--slot4-accent)]">
                <img src="/favicon.ico" alt="favicon.ico" className="h-8 w-8" />
              </span>
              <span className="editable-display text-2xl leading-none text-white">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/62">{globalContent.footer?.description || SITE_CONFIG.description}</p>
           
          </div>

          <FooterColumn title="Discovery">
            {discoveryLinks.map((task) => (
              <Link key={task.key} href={task.route} className="footer-link">{task.label}</Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Resources">
            <Link href="/search" className="footer-link">Search</Link>
            <Link href="/about" className="footer-link">About</Link>
            <Link href="/contact" className="footer-link">Contact</Link>
          </FooterColumn>

          <FooterColumn title="Account">
            {session ? (
              <>
                <Link href="/create" className="footer-link">Submit</Link>
                <button type="button" onClick={logout} className="footer-link text-left">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="footer-link">Sign in</Link>
                <Link href="/signup" className="footer-link">Get started</Link>
              </>
            )}
          </FooterColumn>

          
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs font-medium tracking-[0.12em] text-white/45">
        � {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="editable-mono text-[0.85rem] uppercase tracking-[0.1em] text-[var(--slot4-accent)]">{title}</h3>
      <div className="mt-4 grid gap-2 text-sm text-white/62 [&_.footer-link]:text-white/62 [&_.footer-link]:transition [&_.footer-link:hover]:text-white">
        {children}
      </div>
    </div>
  )
}
