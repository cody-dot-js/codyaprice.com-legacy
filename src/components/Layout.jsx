import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"

import StarryDisplay from "./StarryDisplay"
import Navigation from "./navigation"
import SiteFooter from "./SiteFooter"
import { ActiveBreakpointContext, mediaQueries } from "./breakpoints"

const propTypes = {
  children: PropTypes.node.isRequired,
  layoutRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  leftSidebarContent: PropTypes.node,
  rightSidebarContent: PropTypes.node
}

const defaultProps = {
  layoutRef: React.createRef(),
  leftSidebarContent: null,
  rightSidebarContent: null
}

function Layout({
  children,
  layoutRef,
  leftSidebarContent,
  rightSidebarContent,
  ...otherProps
}) {
  const activeBreakpoint = React.useContext(ActiveBreakpointContext)
  const starCount = React.useMemo(
    () => (activeBreakpoint === "desktop" ? 512 : 256),
    [activeBreakpoint]
  )

  return (
    <div
      ref={layoutRef}
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        /*
          For min-height, use 100vh instead of 100%
          because of the weird reach router wrapper div
        */
        min-height: 100vh;
        width: 100%;

        ${mediaQueries.desktop} {
          display: grid;
          grid-template-columns: 1fr 67% 1fr;
          grid-template-rows: 1fr auto;
          grid-column-gap: 1rem;
        }
      `}
    >
      <StarryDisplay starCount={starCount} />
      <div>{leftSidebarContent}</div>
      <div
        css={css`
          padding: 0 1rem;
          /* pointer events none for click-throughs on starry display */
          pointer-events: none;
          /* position relative for free z-index stacking */
          position: relative;
          margin-bottom: -4rem;

          ${mediaQueries.desktop} {
            padding: 0;
          }
        `}
      >
        <Navigation />
        <main css={{ display: "block" }} role="main" {...otherProps}>
          {children}
        </main>
      </div>
      <div>{rightSidebarContent}</div>
      <SiteFooter
        css={{
          gridColumnStart: 1,
          gridColumnEnd: 4,
          gridRowStart: 3,
          gridRowEnd: 4
        }}
      />
    </div>
  )
}

Layout.propTypes = propTypes
Layout.defaultProps = defaultProps

export default Layout
