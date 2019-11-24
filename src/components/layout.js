import React from "react"
import { Link } from "gatsby"

import { css } from "@emotion/core"
import { rhythm, scale } from "../utils/typography"
import StarrySection from "./StarrySection"
import Navigation from "./navigation/Navigation"
import Card from "./Card"

function Layout({ children, location, title }) {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }

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
          max-width: 50rem;
          padding: 1rem 0.5rem;
          position: relative;
          width: 100%;
        `}
      >
        <Card
          css={css`
            background-color: white;
            margin-top: 5rem;
            margin-bottom: -4rem;
          `}
        >
          <header>{header}</header>
          <main>{children}</main>
        </Card>
      </div>
      <footer
        css={{
          color: "white",
          minHeight: "8rem",
          backgroundColor: "#574b90",
          width: "100%",
        }}
      >
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
