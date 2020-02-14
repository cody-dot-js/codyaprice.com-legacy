/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

function Bio({ ...props }) {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 100) {
            ...GatsbyImageSharpFluid
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
    <div css={{ maxWidth: "50rem", margin: "0 auto" }} {...props}>
      <h1
        css={{
          color: "#fff",
          marginTop: "1rem",
          textAlign: "center",
          pointerEvents: "auto"
        }}
      >
        Hey y'all&nbsp;
        <span role="img" aria-label="waving emoji">
          👋
        </span>
      </h1>
      <Image
        css={{
          borderRadius: "2rem",
          boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38)",
          margin: "0 auto",
          marginBottom: "1rem",
          maxWidth: 640,
          minHeight: 300,
          minWidth: 300,
          pointerEvents: "auto"
        }}
        fluid={data.avatar.childImageSharp.fluid}
        alt={author}
      />
      <section css={{ pointerEvents: "auto" }}>
        <h2 css={{ textAlign: "center" }}>About me</h2>
        <p>
          My name is <strong>Cody Austin Price</strong>, and I am a software
          engineer. That's&nbsp;
          <span role="img" aria-label="index finger pointing up emoji">
            ☝️
          </span>
          me and my beautiful wife!
        </p>
        <p>
          I have experience and comfort at all levels of the development stack,
          but hold a passion for performance and creating delightful user
          experiences. In particular, I love to collaborate with others, and my
          heart lies with the frontend and infrastructure that backs it.
        </p>
        <h2 css={{ textAlign: "center" }}>I believe in...</h2>
        <ul>
          <li>Doing what is right.</li>
          <li>Always giving everything your best effort.</li>
          <li>Delivering on promises.</li>
          <li>Sticking up for those that cannot defend themselves.</li>
          <li>Pursuing my passions.</li>
          <li>Holding true to my moral and ethical principles.</li>
        </ul>
      </section>
    </div>
  )
}

export default Bio
