import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.node
}

const defaultProps = {
  label: null
}

function FormInput({ children, label }) {
  return (
    <label css={{ display: "block", marginBottom: "0.5rem" }}>
      {label}
      {children}
    </label>
  )
}

FormInput.propTypes = propTypes
FormInput.defaultProps = defaultProps

export default FormInput
