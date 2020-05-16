import React from "react"
import PropTypes from "prop-types"
import Link from "../Link"

const propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  activeClassName: PropTypes.string,
}

const defaultProps = {
  to: "#",
  children: null,
  activeClassName: "active",
}

const style = {
  textDecoration: "none",
  color: "#fff",
  borderRadius: "0.25rem",
  padding: "0.5rem",
  transition: "all 0.125s ease-in-out",
  "&:hover,&:focus": {
    background: "#574b90",
    boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38)",
  },
  "&.active": {
    background: "#a44fb6",
    boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38)",
  },
}

function NavigationLink({ children, to, ...extraProps }) {
  return (
    <Link css={style} to={to} partiallyActive {...extraProps}>
      {children}
    </Link>
  )
}

NavigationLink.propTypes = propTypes
NavigationLink.defaultProps = defaultProps

export default NavigationLink
