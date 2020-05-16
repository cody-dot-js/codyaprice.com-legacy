export const breakpoints = [
  1024, // desktop, 64rem
  768, // tablet, 48rem
  0, // mobile
]

export enum Breakpoint {
  mobile = 0,
  tablet = 768,
  desktop = 1024,
}

export const breakpointMinimumsInPx: Record<number, Breakpoint> = {
  0: Breakpoint.mobile,
  768: Breakpoint.tablet, // 48rem
  1024: Breakpoint.desktop, // 64rem
}

export const mediaQueries = {
  mobile: "@media (min-width: 0)",
  tablet: "@media (min-width: 48rem)",
  desktop: "@media (min-width: 64rem)",
}

export { default as ActiveBreakpointContext } from "./ActiveBreakpointContext"
export { default as ActiveBreakpointProvider } from "./ActiveBreakpointProvider"
