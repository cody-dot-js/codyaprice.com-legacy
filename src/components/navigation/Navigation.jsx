import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import NavigationLink from "./NavigationLink"

const propTypes = {}

const defaultProps = {}

function Navigation({ ...otherProps }) {
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
    <nav
      css={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between"
      }}
      {...otherProps}
    >
      <NavigationLink
        to="/"
        css={{
          pointerEvents: "auto",
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
        css={{
          display: "flex",
          pointerEvents: "auto"
        }}
      >
        {topNavigationRoutes.map(({ to, display }, i) => (
          <NavigationLink
            key={to}
            to={to}
            css={{
              marginRight: i !== topNavigationRoutes.length - 1 ? "0.5rem" : 0
            }}
          >
            {display}
          </NavigationLink>
        ))}
      </div>
    </nav>
  )
}

Navigation.propTypes = propTypes
Navigation.defaultProps = defaultProps

export default Navigation
