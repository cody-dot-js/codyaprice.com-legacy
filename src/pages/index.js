import React from "react"
import { graphql } from "gatsby"

import { Bio, Layout, Link, SEO, Tags } from "../components"
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
            <h2
              css={{
                marginBottom: "0.5rem"
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
                __html: node.frontmatter.description || node.excerpt
              }}
            />
            <small
              css={{
                display: "block",
                marginBottom: "0.5rem",
                color: "rgba(0, 0, 0, 0.54)"
              }}
            >
              {formatModifiedTime(node.fields.modifiedTime)}
            </small>
            <Tags list={node.frontmatter.tags} />
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
            tags
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
