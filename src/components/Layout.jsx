import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { css } from "@emotion/core"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faRss } from "@fortawesome/free-solid-svg-icons"

import StarrySection from "./StarrySection"
import Navigation from "./navigation/Navigation"
import { CardCss } from "./Card"
import SiteFooter from "./SiteFooter"

library.add(fab, faRss)

const propTypes = {
  children: PropTypes.node.isRequired,
  leftSidebarContent: PropTypes.node,
  location: PropTypes.object,
  rightSidebarContent: PropTypes.node,
  title: PropTypes.string.isRequired,
  layoutRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
}

const defaultProps = {
  leftSidebarContent: null,
  location: null,
  rightSidebarContent: null,
  layoutRef: React.createRef()
}

function Layout({
  children,
  location,
  title,
  leftSidebarContent,
  rightSidebarContent,
  layoutRef
}) {
  return (
    <div
      ref={layoutRef}
      css={css`
        display: grid;
        height: 100%;
        /*
          For min-height, use 100vh instead of 100%
          because of the weird reach router wrapper div
        */
        min-height: 100vh;
        grid-template-columns: 1fr 4fr 1fr;
        grid-template-rows: 1fr auto;
      `}
    >
      <StarrySection />
      <div>{leftSidebarContent}</div>
      <div
        css={{
          // position relative for free z-index stacking
          position: "relative",
          marginBottom: "-4rem",
          padding: "1rem 2rem"
        }}
      >
        <Navigation />
        <main
          css={{ ...CardCss, backgroundColor: "#fff", display: "block" }}
          role="main"
        >
          <header>
            <h1
              css={{
                margin: 0,
                marginBottom: "1rem"
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
          </header>
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
