import React from "react"
import { css } from "@emotion/core"
import PropTypes from "prop-types"
import Link from "./Link"
import Badge from "./Badge"

const propTypes = {
  slug: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

const focusedStyle = css`
  color: #fff;
  background-color: #3d84a8;
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38);
`

function Tag({ slug, children, ...otherProps }) {
  const [isFocused, setIsFocused] = React.useState(false)

  const onFocus = React.useCallback(() => {
    setIsFocused(true)
  }, [])

  const onBlur = React.useCallback(() => {
    setIsFocused(false)
  }, [])

  return (
    <Link
      to={`/blog/tags/${slug}`}
      onFocus={onFocus}
      onBlur={onBlur}
      css={css`
        text-decoration: none;
        font-weight: 700;
      `}
      {...otherProps}
    >
      <Badge
        color="#3d84a8"
        css={css`
          ${isFocused ? { ...focusedStyle } : ""}
          transition: all 0.125s ease-in-out;

          :hover {
            color: #fff;
            background-color: #3d84a8;
            box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38);
          }
        `}
      >
        {children}
      </Badge>
    </Link>
  )
}

Tag.propTypes = propTypes

export default Tag
