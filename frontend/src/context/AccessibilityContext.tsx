import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type TextSize = 'normal' | 'grande' | 'maior'

interface AccessibilitySettings {
  textSize: TextSize
  highContrast: boolean
  reduceMotion: boolean
}

interface AccessibilityContextValue extends AccessibilitySettings {
  setTextSize: (size: TextSize) => void
  setHighContrast: (value: boolean) => void
  setReduceMotion: (value: boolean) => void
}

const STORAGE_KEY = 'reservalab_accessibility'

const DEFAULT_SETTINGS: AccessibilitySettings = {
  textSize: 'normal',
  highContrast: false,
  reduceMotion: false,
}

function readSettings(): AccessibilitySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<AccessibilitySettings>) }
    }
  } catch {
    // ignora e usa o padrão
  }
  return DEFAULT_SETTINGS
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null)

/**
 * Aplica as preferências de acessibilidade como atributos `data-*` na tag
 * <html>, lidos por regras simples em index.css — nenhuma biblioteca extra
 * necessária.
 */
export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(readSettings)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    const root = document.documentElement
    root.setAttribute('data-text-size', settings.textSize)
    root.setAttribute('data-high-contrast', String(settings.highContrast))
    root.setAttribute('data-reduce-motion', String(settings.reduceMotion))
  }, [settings])

  const value: AccessibilityContextValue = {
    ...settings,
    setTextSize: (textSize) => setSettings((s) => ({ ...s, textSize })),
    setHighContrast: (highContrast) => setSettings((s) => ({ ...s, highContrast })),
    setReduceMotion: (reduceMotion) => setSettings((s) => ({ ...s, reduceMotion })),
  }

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) {
    throw new Error('useAccessibility deve ser usado dentro de <AccessibilityProvider>')
  }
  return ctx
}
