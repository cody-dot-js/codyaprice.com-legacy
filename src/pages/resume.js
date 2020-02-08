import React from "react"

import { Layout } from "../components"

function ResumeSourcePage({ location }) {
  return (
    <Layout location={location} title="Resume source">
      <p>
        <a href="/resume_08022020.pdf">Download my latest resume</a>
      </p>
      <p>
        <a href="/resume.zip">Download my resume's source code</a>
      </p>
    </Layout>
  )
}

export default ResumeSourcePage
