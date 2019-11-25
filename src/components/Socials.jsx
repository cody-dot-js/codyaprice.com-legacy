import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "./Link"
import VisuallyHidden from "./VisuallyHidden"

const propTypes = {}

const defaultProps = {}

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  flexFlow: "row wrap",
}

function Socials() {
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

  return (
    <div css={style}>
      {socials.map(({ id, url }) => (
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
          <FontAwesomeIcon aria-describedby={`icon_${id}`} icon={["fab", id]} />
          <VisuallyHidden id={`icon_${id}`}>Icon for {id}</VisuallyHidden>
        </Link>
      ))}
    </div>
  )
}

Socials.propTypes = propTypes
Socials.defaultProps = defaultProps

export default Socials
