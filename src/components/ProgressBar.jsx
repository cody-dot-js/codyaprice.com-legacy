import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string,
}

const defaultProps = {
  value: 0,
  max: 100,
  className: undefined,
}

const barColor = "#9e579d"

const style = {
  backgroundColor: "transparent",
  color: barColor,
  borderRadius: 0,
  display: "block",
  height: "0.25rem",
  overflow: "hidden",
  width: "100%",
  "&::-webkit-progress-bar": {
    backgroundColor: "transparent",
  },
  "&::-webkit-progress-value": {
    backgroundColor: barColor,
  },

  "&::-moz-progress-bar": {
    backgroundColor: barColor,
  },

  "&::-ms-fill": {
    backgroundColor: barColor,
  },

  "&:focus": {
    outline: "none",
  },

  "&[value]": {
    appearance: "none",
    border: 0, // Remove Firefox and Opera border

    // To fix background color to the proper shade of Grey in Safari
    "&::-webkit-progress-bar": {
      borderRadius: 0,
    },

    "&::-webkit-progress-value": {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
    },
  },

  "&[value='100'],&[value='0']": {
    "&::-webkit-progress-value": {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
    },
  },
}

function ProgressBar({ value, max, className }) {
  const normalizedValue = (value / max) * 100

  return (
    <progress
      className={className}
      css={style}
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
