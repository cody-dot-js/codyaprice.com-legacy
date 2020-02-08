import React from "react"

import { Layout } from "../components"

function ResumeSourcePage({ location }) {
  return (
    <Layout location={location} title="Resume source">
      <a href="/resume.zip">Download my resume's source code</a>
    </Layout>
  )
}

export default ResumeSourcePage
