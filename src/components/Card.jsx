import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {
  children: null,
}

const style = {
  borderRadius: "0.25rem",
  boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38)",
  margin: "1rem 0",
  padding: "1rem",
}

function Card({ children, ...otherProps }) {
  return (
    <div {...otherProps} css={style}>
      {children}
    </div>
  )
}

Card.propTypes = propTypes
Card.defaultProps = defaultProps

export { style as CardCss }

export default Card
