import React from "react"
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
  max-width: 64rem;
  padding: 0 0.5rem;
  width: 100%;
`

function Navigation() {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 64, height: 64) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          topNavigationRoutes {
            to
            display
          }
        }
      }
    }
  `)

  const { author, topNavigationRoutes } = data.site.siteMetadata

  return (
    <header css={headerStyle}>
      <div css={navContainer}>
        <nav css={navStyle}>
          <NavigationLink
            to="/"
            css={{
              "&:hover,&:focus": {
                background: "none"
              },
              "&.active": {
                background: "none"
              }
            }}
          >
            <div css={{ display: "flex", alignItems: "center" }}>
              <Image
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
                css={{
                  marginRight: "1rem",
                  marginBottom: 0,
                  minWidth: "4rem",
                  borderRadius: "100%"
                }}
                imgStyle={{
                  borderRadius: `50%`,
                  margin: 0
                }}
              />
              <span>{author}</span>
            </div>
          </NavigationLink>
          <div
            css={css`
              display: flex;
            `}
          >
            {topNavigationRoutes.map(({ to, display }, i) => (
              <NavigationLink
                key={to}
                to={to}
                css={{
                  marginRight:
                    i !== topNavigationRoutes.length - 1 ? "0.5rem" : 0
                }}
              >
                {display}
              </NavigationLink>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}

Navigation.propTypes = propTypes
Navigation.defaultProps = defaultProps

export default Navigation
