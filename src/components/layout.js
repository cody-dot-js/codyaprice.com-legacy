import React from "react"
import { Link } from "gatsby"

import { css } from "@emotion/core"
import StarrySection from "./StarrySection"
import Navigation from "./navigation/Navigation"
import Card from "./Card"
import SiteFooter from "./SiteFooter"

function Layout({ children, location, title }) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 100vh;
      `}
    >
      <StarrySection />
      <Navigation />
      <div
        css={css`
          flex: 1;
          margin: 0 auto;
          max-width: 64rem;
          padding: 1rem 0.5rem;
          position: relative;
          width: 100%;
        `}
      >
        <Card
          css={css`
            background-color: white;
            margin-top: 7rem;
            margin-bottom: -4rem;
            padding: 1rem 2rem;
          `}
        >
          <header>
            <h1
              css={{
                margin: 0,
                marginBottom: "1rem",
              }}
            >
              <Link
                css={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                }}
                to="/"
              >
                {title}
              </Link>
            </h1>
          </header>
          <main>{children}</main>
        </Card>
      </div>
      <SiteFooter />
    </div>
  )
}

export default Layout
