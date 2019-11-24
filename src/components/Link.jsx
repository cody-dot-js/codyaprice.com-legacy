import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink } from "gatsby"

const propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
}

const defaultProps = {
  to: "#",
  children: null,
}

function Link({ children, to, ...extraProps }) {
  const isInternal = /^\/(?!\/)/.test(to)

  return isInternal ? (
    <GatsbyLink to={to} {...extraProps}>
      {children}
    </GatsbyLink>
  ) : (
    <a href={to} {...extraProps}>
      {children}
    </a>
  )
}

Link.propTypes = propTypes
Link.defaultProps = defaultProps

export default Link
