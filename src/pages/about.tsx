import React from "react"
import { css } from "@emotion/core"
import { Layout, SEO, Bio } from "../components"

interface Props {}

function AboutPage(props: Props) {
  return (
    <Layout {/* title="About Me" */} {...props}>
      <SEO title="About Me" />
      <Bio
        css={css`
          margin-bottom: 6rem;
        `}
      />
    </Layout>
  )
}

export default AboutPage
