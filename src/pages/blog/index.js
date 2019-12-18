import React from "react"
import { graphql } from "gatsby"
import { FaTags } from "react-icons/fa"

import { Layout, Link, SEO, Tags } from "../../components"
import formatReadingTime from "../../utils/formatReadingTime"
import formatModifiedTime from "../../utils/formatModifiedTime"

function BlogPage({ data, location }) {
  const posts = data.allMdx.edges

  return (
    <Layout
      location={location}
      title="All Blog Posts"
      headerContent={
        <Link
          css={{
            textDecoration: "none",
            color: "#fff",
            borderRadius: "0.25rem",
            background: "#574b90",
            padding: "0.5rem",
            "&:hover,&:focus": {
              background: "#a44fb6"
            }
          }}
          to="/blog/tags"
        >
          View All Tags&nbsp;
          <FaTags css={{ verticalAlign: "middle" }} />
        </Link>
      }
    >
      <SEO title="All Blog Posts" />
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
                marginBottom: "1rem",
                color: "rgba(0, 0, 0, 0.54)"
              }}
            >
              {formatModifiedTime(node.fields.modifiedTime)}
            </small>
            <Tags list={node.fields.tags} />
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
            tags
          }
        }
      }
    }
  }
`
