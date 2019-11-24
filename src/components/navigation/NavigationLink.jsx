import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"
import Link from "../Link"

const propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
}

const defaultProps = {
  to: "#",
  children: null,
}

const style = {
  textDecoration: "none",
  color: "#fff",
  borderRadius: "0.25rem",
  padding: "0.5rem",
  "&:hover,&:focus": {
    background: "#574b90",
  },
  "&.active": {
    background: "#9e579d",
  },
}

function NavigationLink({ children, to, ...extraProps }) {
  return (
    <Link css={style} to={to} {...extraProps}>
      {children}
    </Link>
  )
}

NavigationLink.propTypes = propTypes
NavigationLink.defaultProps = defaultProps

export default NavigationLink
