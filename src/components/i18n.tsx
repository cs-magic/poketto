import { useTranslation } from "next-i18next"
import { createContext } from "react"

type TranslationFunction = (key: string) => string

export const I18nContext = createContext<TranslationFunction | undefined>(undefined)

export const I18nProvider = ({ children }) => {
  const { t } = useTranslation()
  return <I18nContext.Provider value={t}>{children}</I18nContext.Provider>
}
