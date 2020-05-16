import React from "react"
import { graphql } from "gatsby"
import { FaTags } from "react-icons/fa"

import { Link, ListLayout, PostCard, SEO } from "../../components"

function BlogPage({ data, location }) {
  const posts = data.allMdx.edges

  return (
    <ListLayout
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
            transition: "all 0.125s ease-in-out",
            "&:hover,&:focus": {
              background: "#a44fb6",
              boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38)",
            },
            whiteSpace: "nowrap",
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
          <PostCard
            date={node.frontmatter.date}
            description={
              node.fields.descriptionMd ||
              node.frontmatter.description ||
              node.excerpt
            }
            imageAlt={node.fields.hero.alt}
            imageSrc={node.fields.hero.src.childImageSharp.fluid}
            slug={node.fields.slug}
            tags={node.fields.tags}
            timeToRead={node.timeToRead}
            title={node.frontmatter.title}
          />
        </article>
      ))}
    </ListLayout>
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
            descriptionMd
            modifiedTime
            slug
            tags
            hero {
              src {
                ...heroImage320
              }
              alt
              caption
            }
          }
        }
      }
    }
  }
`
