/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

function Bio() {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
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
    <div
      css={{
        display: "flex",
        marginBottom: "2rem",
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        css={{
          marginRight: "0.5rem",
          marginBottom: 0,
          minWidth: 64,
          borderRadius: "100%",
        }}
        imgStyle={{
          borderRadius: "50%",
        }}
      />
      <p>
        Written by <strong>{author}</strong> who is an Electrical and Computer
        Engineer turned Web Developer, proponent of Open Source Software and
        React.js, and an Engineer at Cerner.
      </p>
    </div>
  )
}

export default Bio
