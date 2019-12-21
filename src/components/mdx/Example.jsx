import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  children: PropTypes.node.isRequired,
  caption: PropTypes.node
}

const defaultProps = {
  caption: null
}

function Example({ children, caption }) {
  return (
    <>
      <div
        css={{
          border: "0.25rem #c0c0c0 dashed",
          padding: "1rem",
          margin: "1rem 0"
        }}
      >
        {children}
      </div>
      {caption && (
        <>
          <br />
          <figcaption>{caption}</figcaption>
        </>
      )}
    </>
  )
}

Example.propTypes = propTypes
Example.defaultProps = defaultProps

export default Example
