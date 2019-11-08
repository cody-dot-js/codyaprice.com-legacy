import React from "react"
import { Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { rhythm } from "../utils/typography"
import Card from "./Card"
import formatSeriesRange from "../utils/formatSeriesRange"

function SeriesHeader({ seriesId, title, number, total, subtitle, body }) {
  const seriesRange = formatSeriesRange(title, number, total)

  return (
    <Card
      css={{ backgroundColor: "rgba(224, 224, 224, 0.38)", margin: "2rem 0" }}
    >
      <h2>Series</h2>
      <h2
        css={{
          color: "rgba(0, 0, 0, 0.87)",
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <h3
          css={{
            color: "rgba(0, 0, 0, 0.54)",
            marginTop: rhythm(0.25),
            marginBottom: rhythm(1),
          }}
        >
          {subtitle}
        </h3>
      )}
      <h4
        css={{
          color: "rgba(0, 0, 0, 0.54)",
          marginTop: rhythm(0.25),
          marginBottom: rhythm(0.75),
        }}
      >
        {/* For now, just link to the series index page */}
        <Link to="/series">{seriesRange}</Link>
      </h4>
      <MDXRenderer>{body}</MDXRenderer>
    </Card>
  )
}

export default SeriesHeader
