import React from "react"
import PropTypes from "prop-types"
import HeaderLink from "./HeaderLink"

function insertScript(src, id, parent) {
  const script = document.createElement("script")
  script.async = true
  script.src = src
  script.id = id
  parent.appendChild(script)

  return script
}

function removeScript(id, parent) {
  const script = document.getElementById(id)

  if (script) {
    parent.removeChild(script)
  }
}

const propTypes = {
  id: PropTypes.string.isRequired,
  commentoSrc: PropTypes.string,
  commentoScriptId: PropTypes.string,
}

const defaultProps = {
  commentoSrc: "https://cdn.commento.io/js/commento.js",
  commentoScriptId: "commento-script",
}

function Commento({ id, commentoSrc, commentoScriptId }) {
  const commentoRef = React.useRef(null)

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
      <HeaderLink id="comments">Comments</HeaderLink>
      <div ref={commentoRef} id="commento" />
    </div>
  )
}

Commento.propTypes = propTypes
Commento.defaultProps = defaultProps

export default Commento
