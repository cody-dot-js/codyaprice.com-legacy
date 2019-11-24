import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Link from "./Link"

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
          <i className={`fab fa-${id}`} />
        </Link>
      ))}
    </div>
  )
}

Socials.propTypes = propTypes
Socials.defaultProps = defaultProps

export default Socials
