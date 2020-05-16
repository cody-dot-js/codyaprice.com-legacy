import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink } from "gatsby"

const propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  partiallyActive: PropTypes.bool,
}

const defaultProps = {
  to: "#",
  children: null,
  partiallyActive: false,
}

function Link({ children, to, partiallyActive, ...extraProps }) {
  const isInternal = /^\/(?!\/)/.test(to)

  return isInternal ? (
    <GatsbyLink to={to} partiallyActive={partiallyActive} {...extraProps}>
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
