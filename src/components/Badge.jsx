import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
}

const defaultProps = {
  children: null,
  color: "#a44fb6",
}

const style = {
  padding: "0.5rem",
  borderRadius: "50%",
}

function Badge({ children, color, ...extraProps }) {
  return (
    <div
      css={{
        padding: "0.5rem",
        color: color,
        borderRadius: "0.5rem",
        border: `1px solid ${color}`,
        fontSize: "0.75rem",
      }}
      {...extraProps}
    >
      {children}
    </div>
  )
}

Badge.propTypes = propTypes
Badge.defaultProps = defaultProps

export default Badge
