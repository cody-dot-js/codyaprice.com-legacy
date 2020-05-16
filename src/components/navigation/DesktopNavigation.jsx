import React from "react"
import PropTypes from "prop-types"
import NavigationLink from "./NavigationLink"

const propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
}

const defaultProps = {
  routes: [],
}

function DesktopNavigation({ routes, ...otherProps }) {
  return (
    <ul
      css={{
        display: "flex",
        listStyle: "none",
        margin: 0,
      }}
      {...otherProps}
    >
      {routes.map(({ to, display }) => (
        <NavigationLink
          key={to}
          to={to}
          css={{
            ":not(:last-of-type)": {
              marginRight: "0.5rem",
            },
          }}
        >
          {display}
        </NavigationLink>
      ))}
    </ul>
  )
}

DesktopNavigation.propTypes = propTypes
DesktopNavigation.defaultProps = defaultProps

export default DesktopNavigation
