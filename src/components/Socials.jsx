import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "./Link"
import VisuallyHidden from "./VisuallyHidden"

const propTypes = {
  otherLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      iconType: PropTypes.string,
    })
  ),
}

const defaultProps = {
  otherLinks: [],
}

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  flexFlow: "row wrap",
}

function Socials({ otherLinks }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          socials {
            id
            url
          }
        }
      }
    }
  `)

  const { socials } = data.site.siteMetadata

  const allLinks = socials.concat(otherLinks)

  return (
    <div css={style}>
      {allLinks.map(({ id, url, iconType = "fab" }) => (
        <Link
          key={id}
          to={url}
          aria-label={`Link to ${id}`}
          css={{
            textDecoration: "none",
            fontSize: "2rem",
            padding: "1rem",
            color: "white",
            dispaly: "block",
          }}
        >
          <FontAwesomeIcon
            aria-describedby={`icon_${id}`}
            icon={[iconType, id]}
          />
          <VisuallyHidden id={`icon_${id}`}>Icon for {id}</VisuallyHidden>
        </Link>
      ))}
    </div>
  )
}

Socials.propTypes = propTypes
Socials.defaultProps = defaultProps

export default Socials
