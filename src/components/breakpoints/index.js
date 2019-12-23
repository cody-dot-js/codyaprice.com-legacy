export const breakpoints = [
  1024, // desktop, 64rem
  768, // tablet, 48rem
  0 // mobile
]

export const breakpointMinimumsInPx = {
  0: "mobile",
  768: "tablet", // 48rem
  1024: "desktop" // 64rem
}

export const mediaQueries = {
  mobile: "@media (min-width: 0)",
  tablet: "@media (min-width: 48rem)",
  desktop: "@media (min-width: 64rem)"
}

export { default as ActiveBreakpointContext } from "./ActiveBreakpointContext"
export { default as ActiveBreakpointProvider } from "./ActiveBreakpointProvider"
