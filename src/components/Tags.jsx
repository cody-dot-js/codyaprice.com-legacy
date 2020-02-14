import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash.kebabcase"
import Link from "./Link"
import Badge from "./Badge"

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.string)
}

const defaultProps = {
  list: []
}

function Tags({ list, ...otherProps }) {
  return (
    <div
      css={{
        display: "flex",
        flexFlow: "row wrap",
        marginBottom: "1rem"
      }}
      {...otherProps}
    >
      {list.map((tag, i) => {
        const slug = kebabCase(tag.toLowerCase())

        return (
          <Link
            key={tag}
            to={`/blog/tags/${slug}`}
            css={{
              textDecoration: "none",
              fontWeight: 700
            }}
          >
            <Badge
              color="#3d84a8"
              css={{
                marginTop: "0.5rem",
                marginRight: i === list.length - 1 ? 0 : "0.5rem"
              }}
            >
              {tag}
            </Badge>
          </Link>
        )
      })}
    </div>
  )
}

Tags.propTypes = propTypes
Tags.defaultProps = defaultProps

export default Tags
