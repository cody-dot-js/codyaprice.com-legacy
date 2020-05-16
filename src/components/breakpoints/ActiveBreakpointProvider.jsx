import React from "react"
import PropTypes from "prop-types"
import BreakpointContext from "./ActiveBreakpointContext"
import { breakpoints, breakpointMinimumsInPx } from "./"

const propTypes = {
  children: PropTypes.node.isRequired,
}

function getActiveBreakpoint(width = 0) {
  const _width = parseInt(width, 10)
  const size = _width >= 0 ? _width : 0

  const breakpoint = breakpoints.find((breakpoint) => size >= breakpoint)

  return breakpointMinimumsInPx[breakpoint]
}

function width() {
  if (typeof window !== "undefined") {
    return window.innerWidth
  }

  return 0
}

function ActiveBreakpointProvider({ children }) {
  const [activeBreakpoint, setActiveBreakpoint] = React.useState(
    getActiveBreakpoint(width())
  )

  const updateActiveBreakpoint = React.useCallback(() => {
    const breakpoint = getActiveBreakpoint(width())

    if (activeBreakpoint !== breakpoint) {
      setActiveBreakpoint(breakpoint)
    }
  }, [activeBreakpoint])

  React.useEffect(() => {
    window.addEventListener("resize", updateActiveBreakpoint)

    return () => {
      window.removeEventListener("resize", updateActiveBreakpoint)
    }
  }, [updateActiveBreakpoint])

  return (
    <BreakpointContext.Provider value={activeBreakpoint}>
      {children}
    </BreakpointContext.Provider>
  )
}

ActiveBreakpointProvider.propTypes = propTypes
ActiveBreakpointProvider.displayName = "AyyLmao"

export default ActiveBreakpointProvider
