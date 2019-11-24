import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import NavigationLink from "./NavigationLink"

const propTypes = {}

const defaultProps = {}

const navStyle = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const headerStyle = css`
  background: none;
  flex-shrink: 0;
  padding: 2rem 0 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
`

const navContainer = css`
  margin: 0 auto;
  max-width: 50rem;
  padding: 0 0.5rem;
  width: 100%;
`

function Navigation({}) {
  // const data = useStaticQuery(graphql`
  //   ...BioQuery
  //   # query BioQuery {
  //   #   avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
  //   #     childImageSharp {
  //   #       fixed(width: 50, height: 50) {
  //   #         ...GatsbyImageSharpFixed
  //   #       }
  //   #     }
  //   #   }
  //   #   site {
  //   #     siteMetadata {
  //   #       author
  //   #       social {
  //   #         twitter
  //   #       }
  //   #     }
  //   #   }
  //   # }
  // `)

  return (
    <header css={headerStyle}>
      <div css={navContainer}>
        <nav css={navStyle}>
          <NavigationLink to="/">Cody A. Price</NavigationLink>
          <div
            css={css`
              display: flex;
            `}
          >
            <NavigationLink to="/blog">Blog</NavigationLink>
            <NavigationLink to="/series">Series</NavigationLink>
            <NavigationLink to="/projects">Projects</NavigationLink>
            <NavigationLink to="/about">About</NavigationLink>
          </div>
        </nav>
      </div>
    </header>
  )
}

Navigation.propTypes = propTypes
Navigation.defaultProps = defaultProps

export default Navigation
