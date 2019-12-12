import React from "react"
import PropTypes from "prop-types"
import Link from "./Link"
import Badge from "./Badge"

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.string)
}

const defaultProps = {
  list: []
}

function Tags({ list }) {
  return (
    <div
      css={{
        display: "flex",
        flexFlow: "row wrap",
        marginBottom: "1rem"
      }}
    >
      {list.map((tag, i) => (
        <Link
          // TODO: make tags go to `/tags/${tag}`
          key={tag}
          to="#"
          css={{
            textDecoration: "none",
            color: "#a44fb6"
          }}
        >
          <Badge
            css={{
              marginTop: "0.5rem",
              marginRight: i === list.length - 1 ? 0 : "0.5rem"
            }}
          >
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  )
}

Tags.propTypes = propTypes
Tags.defaultProps = defaultProps

export default Tags
