import React from "react"

import { Layout, SEO, Bio } from "../components"

function AboutPage({ location }) {
  return (
    <Layout location={location} title="About Me">
      <SEO title="About Me" />
      <Bio css={{ marginBottom: "6rem" }} />
    </Layout>
  )
}

export default AboutPage
