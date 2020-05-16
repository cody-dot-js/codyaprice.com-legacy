import React from "react"
import { css } from "@emotion/core"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import NavigationLink from "./NavigationLink"
import Logo from "./Logo"

const propTypes = {
  to: PropTypes.string,
}

const defaultProps = {
  to: "/",
}

function AuthorAvatarLink({ to, ...otherProps }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata

  return (
    <NavigationLink
      to={to}
      css={{
        padding: 0,
        "&.active": {
          background: "none",
          boxShadow: "none",
        },
        "&:hover,&:focus": {
          background: "none",
        },
      }}
      {...otherProps}
    >
      <div css={{ display: "flex", alignItems: "center" }}>
        <Logo
          css={css`
            width: 4rem;
            fill: #fff;
            margin: 0;
            margin-right: 1rem;
            border-radius: 100%;
            transition: all 0.125s ease-in-out;

            &:hover,
            &:focus {
              fill: #a44fb6;
              box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38);
            }
          `}
        />
        <span
          css={css`
            transition: all 0.125s ease-in-out;
            white-space: nowrap;

            &:hover,
            &:focus {
              color: #a44fb6;
            }
          `}
        >
          {author}
        </span>
      </div>
    </NavigationLink>
  )
}

AuthorAvatarLink.propTypes = propTypes
AuthorAvatarLink.defaultProps = defaultProps

export default AuthorAvatarLink
