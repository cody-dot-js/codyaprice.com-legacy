import React from "react"
import Link from "./Link"
import Socials from "./Socials"

const propTypes = {}

const defaultProps = {}

const style = {
  color: "white",
  minHeight: "8rem",
  backgroundColor: "#393152",
  width: "100%",
  padding: "2rem",
}

function SiteFooter({ ...otherProps }) {
  const rssLink = {
    id: "rss",
    url: "https://codyaprice.com/rss.xml",
  }

  return (
    <footer css={style} {...otherProps}>
      <div
        css={{
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5rem",
        }}
      >
        <div>
          © {new Date().getFullYear()}, Built with ❤️ by Cody A. Price
          using&nbsp;
          <Link css={{ color: "white" }} to="https://www.gatsbyjs.org">
            Gatsby
          </Link>
        </div>
        <Socials otherLinks={[rssLink]} />
      </div>
    </footer>
  )
}

SiteFooter.propTypes = propTypes
SiteFooter.defaultProps = defaultProps

export default SiteFooter
