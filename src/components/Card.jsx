import React from "react"
import { css } from "@emotion/core"
import PropTypes from "prop-types"

const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {
  children: null,
}

const style = css`
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38);
  margin: 1rem 0;
  padding: 1rem;
`

function Card({ children, ...otherProps }) {
  return (
    <div {...otherProps} css={style}>
      {children}
    </div>
  )
}

Card.propTypes = propTypes
Card.defaultProps = defaultProps

export default Card
