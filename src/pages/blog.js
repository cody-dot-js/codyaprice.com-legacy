import React from "react"
import { graphql } from "gatsby"

import { Layout, SEO, Link } from "../components"
import formatReadingTime from "../utils/formatReadingTime"
import formatModifiedTime from "../utils/formatModifiedTime"

function BlogPage({ data, location }) {
  const posts = data.allMdx.edges

  return (
    <Layout location={location} title="All Blog Posts">
      <SEO title="All Blog Posts" />
      {posts.map(({ node }) => (
        <article key={node.fields.slug}>
          <header>
            <h2
              css={{
                marginBottom: "0.5rem",
              }}
            >
              <Link to={node.fields.slug}>
                {node.frontmatter.title || node.fields.slug}
              </Link>
            </h2>
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

export default BlogPage

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
