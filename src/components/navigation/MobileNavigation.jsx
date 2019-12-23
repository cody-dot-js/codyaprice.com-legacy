import React from "react"
import PropTypes from "prop-types"
import { keyframes } from "@emotion/core"
import { MdMenu, MdClose } from "react-icons/md"
import useToggle from "../../hooks/useToggle"
import NavigationLink from "./NavigationLink"

const propTypes = {
  color: PropTypes.string,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired
    })
  )
}

const defaultProps = {
  color: "#fff",
  routes: []
}

const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`

function MobileNavigation({ color, routes, ...otherProps }) {
  const [isOpen, toggleIsOpen] = useToggle(false)

  const openContainerCss = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#303a52",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: "100vh",
    width: "100%",
    zIndex: 100
  }

  return (
    <div css={isOpen ? openContainerCss : {}} {...otherProps}>
      <button
        type="button"
        onClick={toggleIsOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        css={{
          color,
          fontSize: "2rem",
          background: 0,
          border: 0,
          // outline: 0,
          verticalAlign: "middle",
          lineHeight: 0,
          padding: 0,
          margin: 0,
          right: "1rem",
          top: "1.5rem",
          position: isOpen ? "absolute" : "static"
        }}
      >
        {isOpen ? (
          <MdClose css={{ animation: `${fadeIn} 300ms` }} />
        ) : (
          <MdMenu css={{ animation: `${fadeIn} 300ms` }} />
        )}
      </button>
      {isOpen && (
        <ul
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: 0,
            listStyle: "none",
            width: "100%"
          }}
        >
          {routes.map(({ to, display }) => (
            <li key={to} css={{ margin: "1rem" }}>
              <NavigationLink to={to}>{display}</NavigationLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

MobileNavigation.propTypes = propTypes
MobileNavigation.defaultProps = defaultProps

export default MobileNavigation
