import React from "react"
import { css } from "@emotion/core"
import PropTypes from "prop-types"
import kebabCase from "lodash.kebabcase"
import Tag from "./Tag"

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.string)
}

const defaultProps = {
  list: []
}

function Tags({ list, ...otherProps }) {
  return (
    <div
      css={css`
        display: flex;
        flex-flow: row wrap;
        margin-bottom: 1rem;
      `}
      {...otherProps}
    >
      {list.map((tag, i) => {
        const slug = kebabCase(tag.toLowerCase())

        return (
          <Tag
            key={tag}
            slug={slug}
            css={css`
              margin-top: 0.5rem;
              margin-right: 0.5rem;

              :last-of-type {
                margin-right: 0;
              }
            `}
          >
            {tag}
          </Tag>
        )
      })}
    </div>
  )
}

Tags.propTypes = propTypes
Tags.defaultProps = defaultProps

export default Tags
