import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames/bind"
import styles from "./ProgressBar.module.scss"

const cx = classNames.bind(styles)

const propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.object,
}

const defaultProps = {
  value: 0,
  max: 100,
  className: {},
}

function ProgressBar({ value, max, className }) {
  const normalizedValue = (value / max) * 100

  const classes = cx(["progress", className])

  return (
    <progress
      className={classes}
      max={100}
      value={normalizedValue}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={normalizedValue}
      aria-valuetext={`${normalizedValue} %`}
      tabIndex="-1"
    />
  )
}

ProgressBar.propTypes = propTypes
ProgressBar.defaultProps = defaultProps

export default ProgressBar
