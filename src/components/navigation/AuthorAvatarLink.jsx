import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import NavigationLink from "./NavigationLink"

const propTypes = {
  to: PropTypes.string
}

const defaultProps = {
  to: "/"
}

function AuthorAvatarLink({ to, ...otherProps }) {
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
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata

  return (
    <NavigationLink
      to={to}
      css={{
        "&:hover,&:focus": {
          background: "none"
        },
        "&.active": {
          background: "none"
        }
      }}
      {...otherProps}
    >
      <div css={{ display: "flex", alignItems: "center" }}>
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={`${author} avatar`}
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
        <span css={{ whiteSpace: "nowrap" }}>{author}</span>
      </div>
    </NavigationLink>
  )
}

AuthorAvatarLink.propTypes = propTypes
AuthorAvatarLink.defaultProps = defaultProps

export default AuthorAvatarLink
