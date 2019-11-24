import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

function ProjectsPage({ data, location }) {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Projects" />
      <h1>Projects</h1>
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

export default ProjectsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
