import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import AuthorAvatarLink from "./AuthorAvatarLink"
import { ActiveBreakpointContext } from "../breakpoints"
import DesktopNavigation from "./DesktopNavigation"
import MobileNavigation from "./MobileNavigation"

const propTypes = {}

const defaultProps = {}

function Navigation({ ...otherProps }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          topNavigationRoutes {
            to
            display
          }
        }
      }
    }
  `)

  const { topNavigationRoutes: routes } = data.site.siteMetadata
  const activeBreakpoint = React.useContext(ActiveBreakpointContext)
  const isDesktop = activeBreakpoint === "desktop"

  const allowInteraction = { pointerEvents: "auto" }

  return (
    <nav
      css={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between"
      }}
      {...otherProps}
    >
      <AuthorAvatarLink to="/" css={allowInteraction} />
      {isDesktop ? (
        <DesktopNavigation routes={routes} css={allowInteraction} />
      ) : (
        <MobileNavigation routes={routes} css={allowInteraction} />
      )}
    </nav>
  )
}

Navigation.propTypes = propTypes
Navigation.defaultProps = defaultProps

export default Navigation
