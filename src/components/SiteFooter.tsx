import React from "react"
import { css } from "@emotion/core"
import Link from "./Link"
import Socials, { Social } from "./Socials"

const rssLink = {
  id: Social.rss,
  url: "https://codyaprice.com/rss.xml",
}

function SiteFooter({ ...otherProps }) {
  return (
    <footer
      css={css`
        color: white;
        min-height: 8rem; // 128px
        background-color: #393152;
        width: 100%;
        padding: 2rem;
      `}
      {...otherProps}
    >
      <div
        css={css`
          display: flex;
          flex-flow: column wrap;
          align-items: center;
          justify-content: center;
          margin-top: 5rem;
        `}
      >
        <div>
          © {new Date().getFullYear()}, Built with ❤️ by Cody A. Price
          using&nbsp;
          <Link
            css={css`
              color: #fff;
            `}
            to="https://www.gatsbyjs.org"
          >
            Gatsby
          </Link>
        </div>
        <Socials otherLinks={[rssLink]} />
      </div>
    </footer>
  )
}

export default SiteFooter
