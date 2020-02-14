import React from "react"
import { graphql } from "gatsby"

import { ListLayout, SEO, PostCard } from "../components"

function TagsList({ data, location, pageContext }) {
  const posts = data.allMdx.edges
  const { tag, count } = pageContext

  return (
    <ListLayout
      location={location}
      title={`All Blog Posts with Tag: ${tag} (${count})`}
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

export default TagsList

export const pageQuery = graphql`
  query BlogPostsByTag($tag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { tags: { in: [$tag] } } }
    ) {
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
