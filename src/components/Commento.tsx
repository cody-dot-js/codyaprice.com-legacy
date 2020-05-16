import React from "react"
import HeadingLink from "./HeadingLink"

function insertScript(src: string, id: string, parent: HTMLElement) {
  const script = document.createElement("script")
  script.async = true
  script.src = src
  script.id = id
  parent.appendChild(script)

  return script
}

function removeScript(id: string, parent: HTMLElement) {
  const script = document.getElementById(id)

  if (script) {
    parent.removeChild(script)
  }
}

interface Props {
  id: string
  commentoSrc?: string
  commentoScriptId?: string
}

function Commento({
  id,
  commentoSrc = "https://cdn.commento.io/js/commento.js",
  commentoScriptId = "commento-script",
}: Props) {
  const commentoRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!document) {
      return
    }

    const { current: commento } = commentoRef

    if (commento) {
      insertScript(commentoSrc, commentoScriptId, document.body)
    }

    return () => removeScript(commentoScriptId, document.body)
  }, [id, commentoSrc, commentoScriptId])

  return (
    <div>
      <HeadingLink id="comments">Comments</HeadingLink>
      <div ref={commentoRef} id="commento" />
    </div>
  )
}

export default Commento
