import React from "react"
import { graphql } from "gatsby"

import { Layout, SEO } from "../components"

function EssaysPage({ data, location }) {
  return (
    <Layout location={location} title="Essays">
      <SEO title="All Essays" />
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

export default EssaysPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
