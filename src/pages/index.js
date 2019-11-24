import React from "react"
import { graphql } from "gatsby"

import { Bio, Layout, Link, SEO } from "../components"
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
              css={{
                marginBottom: "0.5rem",
              }}
            >
              <Link
                css={{ color: "#fc85ae", "&:visited": { color: "#9e579d" } }}
                to={node.fields.slug}
              >
                {node.frontmatter.title || node.fields.slug}
              </Link>
            </h3>
            <small css={{ display: "block" }}>
              {node.frontmatter.date}
              {` • ${formatReadingTime(node.timeToRead)}`}
            </small>
          </header>
          <section>
            <p
              css={{ margin: 0 }}
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
            <small
              css={{
                display: "block",
                marginBottom: "1rem",
                color: "rgba(0, 0, 0, 0.54)",
              }}
            >
              {formatModifiedTime(node.fields.modifiedTime)}
            </small>
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
