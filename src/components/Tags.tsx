import React from "react"
import { css } from "@emotion/core"
import kebabCase from "lodash.kebabcase"
import Tag from "./Tag"

interface Props {
  list?: Array<string>
}

function Tags({ list = [], ...otherProps }: Props) {
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

export default Tags
