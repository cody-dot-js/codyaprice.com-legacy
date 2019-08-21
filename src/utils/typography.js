import Typography from "typography"
import type from "typography-theme-noriega"
import blockquote from "./blockquote.css"

type.overrideThemeStyles = ({ rhythm }, options) => ({
  blockquote,
})

const typography = new Typography(type)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
