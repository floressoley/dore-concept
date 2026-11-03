import { createContext, useContext, useEffect } from 'react'

/**
 * What sits under the transparent navigation.
 * Photo = a hero image or video runs behind it, so the nav starts with linen text.
 * Plain = a flat light page, so the nav starts with ink text and the page is pushed below it.
 */
export type NavThemeName = 'Plain' | 'Photo'

type NavThemeValue = { theme: NavThemeName; setTheme: (theme: NavThemeName) => void }

export const NavThemeContext = createContext<NavThemeValue>({ theme: 'Plain', setTheme: () => {} })

export const useNavThemeValue = () => useContext(NavThemeContext).theme

/** Call from a page whose first section is a photo or video that should sit under the nav. */
export function useNavTheme(theme: NavThemeName) {
  const { setTheme } = useContext(NavThemeContext)
  useEffect(() => {
    setTheme(theme)
    return () => setTheme('Plain')
  }, [theme, setTheme])
}
