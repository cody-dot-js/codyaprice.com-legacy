import React from "react"

import { PostLayout } from "../components"

function ResumeSourcePage({ location }) {
  return (
    <PostLayout
      css={{ minHeight: "50rem" }}
      location={location}
      title="Resume source"
    >
      <p>
        You can download either my resume as a pdf or the react source code used
        to generate the pdf.
      </p>
      <p>
        <a href="/resume_17022020.pdf">Download my latest resume</a>
      </p>
      <p>
        <a href="/resume.zip">Download my resume's source code</a>
      </p>
    </PostLayout>
  )
}

export default ResumeSourcePage
