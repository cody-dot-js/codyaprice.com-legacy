import React from "react"
import { ActiveBreakpointProvider } from "./src/components/breakpoints"
import "./content/assets/oceanic-next.css"

export function wrapRootElement({ element }) {
  return <ActiveBreakpointProvider>{element}</ActiveBreakpointProvider>
}
