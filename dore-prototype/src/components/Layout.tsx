import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useSectionReveal } from '../lib/useSectionReveal.ts'
import { cn } from '../lib/cn.ts'
import { BackToTop } from './BackToTop.tsx'
import { Footer } from './Footer.tsx'
import { Navigation } from './Navigation.tsx'
import { TopProgress } from './TopProgress.tsx'
import { NavThemeContext } from './NavTheme.tsx'
import type { NavThemeName } from './NavTheme.tsx'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

/** Shared page frame: skip link, navigation, main landmark, footer. */
export function Layout() {
  const [theme, setTheme] = useState<NavThemeName>('Plain')
  const { pathname } = useLocation()
  useSectionReveal(pathname)
  return (
    <NavThemeContext.Provider value={{ theme, setTheme }}>
      <TopProgress />
      <ScrollToTop />
      <a
        href="#main"
        className="eyebrow sr-only focus:not-sr-only focus:fixed focus:top-xs focus:left-xs focus:z-50 focus:rounded-control focus:bg-ink focus:px-md focus:py-sm focus:text-linen"
      >
        Skip to content
      </a>
      <Navigation />
      <main id="main" className={cn(theme === 'Plain' && 'pt-nav')}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </NavThemeContext.Provider>
  )
}
