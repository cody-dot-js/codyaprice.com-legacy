import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import {
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaRss,
  FaTwitter
} from "react-icons/fa"
import Link from "./Link"
import VisuallyHidden from "./VisuallyHidden"

function Icon({ id, ...otherProps }) {
  const icons = {
    dribbble: FaDribbble,
    facebook: FaFacebook,
    github: FaGithub,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    medium: FaMedium,
    rss: FaRss,
    twitter: FaTwitter
  }

  const Icon = icons[id]

  return <Icon {...otherProps} />
}

const propTypes = {
  otherLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      iconType: PropTypes.string
    })
  )
}

const defaultProps = {
  otherLinks: []
}

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  flexFlow: "row wrap"
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
      {allLinks.map(({ id, url }) => {
        return (
          <Link
            key={id}
            to={url}
            aria-label={`Link to ${id}`}
            css={{
              textDecoration: "none",
              fontSize: "2rem",
              padding: "1rem",
              color: "white",
              dispaly: "block"
            }}
          >
            <Icon id={id} css={{ verticalAlign: "middle" }} />
            <VisuallyHidden id={`icon_${id}`}>Icon for {id}</VisuallyHidden>
          </Link>
        )
      })}
    </div>
  )
}

Socials.propTypes = propTypes
Socials.defaultProps = defaultProps

export default Socials
