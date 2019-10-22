import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import formatReadingTime from "../utils/formatReadingTime"
import formatModifiedTime from "../utils/formatModifiedTime"

function BlogIndex({ data, location }) {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => (
        <article key={node.fields.slug}>
          <header>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {node.frontmatter.title || node.fields.slug}
              </Link>
            </h3>
            <small style={{ display: "block" }}>
              {node.frontmatter.date}
              {` • ${formatReadingTime(node.timeToRead)}`}
            </small>
          </header>
          <section>
            <p
              style={{ margin: 0 }}
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
            <p
              style={{
                ...scale(-1 / 2),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {formatModifiedTime(node.fields.modifiedTime)}
            </p>
          </section>
        </article>
      ))}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
          fields {
            modifiedTime
            slug
          }
        }
      }
    }
  }
`
