import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { css } from "@emotion/core"

import StarryDisplay from "./StarryDisplay"
import Navigation from "./navigation/Navigation"
import { CardCss } from "./Card"
import SiteFooter from "./SiteFooter"

const propTypes = {
  children: PropTypes.node.isRequired,
  headerContent: PropTypes.node,
  layoutRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  leftSidebarContent: PropTypes.node,
  location: PropTypes.object,
  rightSidebarContent: PropTypes.node,
  title: PropTypes.string.isRequired
}

const defaultProps = {
  headerContent: null,
  layoutRef: React.createRef(),
  leftSidebarContent: null,
  location: null,
  rightSidebarContent: null
}

const desktopBreakpoint = "(min-width: 48rem)"
const desktopBreakpointMq = `@media ${desktopBreakpoint}`

function Layout({
  children,
  headerContent,
  layoutRef,
  leftSidebarContent,
  location,
  rightSidebarContent,
  title,
  ...otherProps
}) {
  const starCountRef = React.useRef()
  const { current: starCount } = starCountRef

  React.useEffect(() => {
    // only check on mount, really we're checking if we're on a "mobile"-like
    // device
    const { matches: isAtDesktopBreakpoint } = window.matchMedia(
      desktopBreakpoint
    )

    starCountRef.current = isAtDesktopBreakpoint ? 512 : 256
  }, [])

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

        ${desktopBreakpointMq} {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
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

          ${desktopBreakpointMq} {
            padding: 0;
          }
        `}
      >
        <Navigation />
        <main
          css={{
            ...CardCss,
            backgroundColor: "#fff",
            display: "block",
            padding: "2rem",
            pointerEvents: "auto",
            minHeight: "50rem"
          }}
          role="main"
          {...otherProps}
        >
          <div css={{ margin: "0 auto", maxWidth: "40rem" }}>
            <header
              css={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem"
              }}
            >
              <h1
                css={{
                  margin: 0
                }}
              >
                <Link
                  css={{
                    boxShadow: `none`,
                    textDecoration: `none`,
                    color: `inherit`
                  }}
                  to="/"
                >
                  {title}
                </Link>
              </h1>
              <div>{headerContent}</div>
            </header>
            {children}
          </div>
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
