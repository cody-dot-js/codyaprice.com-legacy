import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import {
  Bio,
  Commento,
  Layout,
  ReadingProgress,
  SEO,
  SeriesHeader,
  Tags
} from "../components"
import { rhythm } from "../utils/typography"
import formatReadingTime from "../utils/formatReadingTime"
import formatModifiedTime from "../utils/formatModifiedTime"

function BlogPost({ data, location, pageContext }) {
  const { mdx: post } = data
  const { previous, next } = pageContext
  const postRef = React.useRef(null)
  const isASeries = !!post.frontmatter.series
  const series = {
    ...(pageContext.series || {}),
    ...(post.frontmatter.series || {})
  }

  return (
    <>
      <ReadingProgress targetRef={postRef} />
      <Layout location={location} title={post.frontmatter.title}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <p
              css={{
                display: `block`,
                marginBottom: 0
              }}
            >
              {post.frontmatter.date}
              {` • ${formatReadingTime(post.timeToRead)}`}
            </p>
            <small
              css={{
                display: "block",
                marginBottom: "0",
                color: "rgba(0, 0, 0, 0.54)"
              }}
            >
              {formatModifiedTime(post.fields.modifiedTime)}
            </small>
            <Tags list={post.frontmatter.tags} />
            {isASeries && <SeriesHeader {...series} />}
          </header>
          <div ref={postRef}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </div>
          <hr
            css={{
              marginBottom: rhythm(1)
            }}
          />
          <footer>
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
            css={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              listStyle: "none",
              padding: 0
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <Commento id={post.fields.slug} />
      </Layout>
    </>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      timeToRead
      fields {
        modifiedTime
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        series {
          id
          number
          subtitle
        }
      }
    }
  }
`
