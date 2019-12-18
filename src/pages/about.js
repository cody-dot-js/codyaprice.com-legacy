import React from "react"
import { graphql } from "gatsby"

import { Layout, SEO } from "../components"

function AboutPage({ data, location }) {
  return (
    <Layout location={location} title="About Me">
      <SEO title="About Me" />
      <p>
        <span role="img" aria-label="construction sign">
          🚧
        </span>
        &nbsp;Construction&nbsp;
        <span role="img" aria-label="construction sign">
          🚧
        </span>
      </p>
      <hr />
      <p>It's</p>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
