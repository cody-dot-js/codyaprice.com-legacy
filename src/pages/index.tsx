import React from "react"
import { css } from "@emotion/core"
import { graphql } from "gatsby"

import { Bio, Layout, SEO, PostCard } from "../components"

interface Props {
  data: any
  location: any
}

function PortfolioIndex({ data, location }: Props) {
  const siteTitle = data.site.siteMetadata.title
  const { node: latestPost } = data.allMdx.edges[0]

  return (
    <Layout /* location={location} title={siteTitle} */>
      <SEO title="Cody Price's Portfolio Site" />
      <Bio />
      <hr />
      <section css={{ pointerEvents: "auto" }}>
        <h2>Latest Post</h2>
        <article key={latestPost.fields.slug}>
          <PostCard
            date={latestPost.frontmatter.date}
            description={
              latestPost.fields.descriptionMd ||
              latestPost.frontmatter.description ||
              latestPost.excerpt
            }
            imageAlt={latestPost.fields.hero.alt}
            imageSrc={latestPost.fields.hero.src.childImageSharp.fluid}
            slug={latestPost.fields.slug}
            tags={latestPost.fields.tags}
            timeToRead={latestPost.timeToRead}
            title={latestPost.frontmatter.title}
          />
        </article>
      </section>
    </Layout>
  )
}

export default PortfolioIndex

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
                ...heroImage640
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
