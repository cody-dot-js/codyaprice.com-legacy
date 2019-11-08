import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/Card"
import { MDXRenderer } from "gatsby-plugin-mdx"

function SeriesIndex({ data, location }) {
  const siteTitle = data.site.siteMetadata.title
  const series = data.allSeries.edges

  const seriesEntriesById = React.useMemo(
    () =>
      data.allSeriesEntries.edges.reduce((acc, { node }) => {
        console.log(node)
        const { frontmatter, fields } = node
        const { series, title } = frontmatter
        const current = acc[series.id] || []

        const entry = {
          id: series.id,
          title,
          slug: fields.slug,
        }

        return {
          ...acc,
          [series.id]: current.concat(entry),
        }
      }, {}),
    [data.allSeriesEntries.edges]
  )

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All series" />
      <Bio />
      <h1>All Series:</h1>
      {series.map(({ node }) => {
        const { frontmatter, body } = node
        const { title, seriesId } = frontmatter
        const seriesItems = seriesEntriesById[seriesId]

        return (
          <article key={node.frontmatter.seriesId}>
            <Card>
              <h2>{title}</h2>
              <MDXRenderer>{body}</MDXRenderer>
              {seriesItems && seriesItems.length > 0 && (
                <ol>
                  {seriesItems.map(item => (
                    <li key={item.slug}>
                      <Link style={{ boxShadow: `none` }} to={item.slug}>
                        {item.title || item.slug}
                      </Link>
                    </li>
                  ))}
                </ol>
              )}
            </Card>
          </article>
        )
      })}
    </Layout>
  )
}

export default SeriesIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allSeries: allMdx(
      sort: { fields: frontmatter___title, order: ASC }
      filter: { frontmatter: { seriesId: { ne: null } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            seriesId
          }
          body
        }
      }
    }
    allSeriesEntries: allMdx(
      filter: { frontmatter: { series: { id: { ne: null } } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            series {
              id
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
