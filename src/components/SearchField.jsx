import React from "react"
import PropTypes from "prop-types"
import { MdSearch } from "react-icons/md"

const propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
}

const defaultProps = {
  onChange: null,
  value: undefined
}

function SearchField({ onChange, value, ...otherProps }) {
  const [_value, setValue] = React.useState("")
  const isControlledInput = value !== undefined
  const searchValue = isControlledInput ? value : _value

  const handleChange = React.useCallback(
    event => {
      if (!isControlledInput) {
        setValue(event.target.value)
      }

      if (onChange) {
        onChange(event)
      }
    },
    [isControlledInput, onChange]
  )

  return (
    <label
      css={{ position: "relative", marginBottom: "1rem", display: "block" }}
      {...otherProps}
    >
      <input
        css={{
          display: "block",
          color: "rgba(0, 0, 0, 0.87)",
          backgroundColor: "#f5f5f5",
          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: "2.25rem",
          padding: 0,
          paddingRight: "1rem",
          paddingLeft: "2rem",
          verticalAlign: "middle",
          width: "100%",
          borderWidth: 0,
          borderRadius: "0.25rem",
          overflow: "hidden",
          ":focus": {
            backgroundColor: "#fff",
            boxShadow: "0 0 0 2px #3d84a8",
            outline: 0
          }
        }}
        type="search"
        placeholder="Search tags"
        aria-label="Tag Search"
        title="Filter tags"
        value={searchValue}
        onChange={handleChange}
      />
      <MdSearch
        css={{
          display: "block",
          color: "#78757a",
          width: "1.5rem",
          height: "1.5rem",
          position: "absolute",
          left: "0.25rem",
          top: "0.375rem",
          pointerEvents: "none",
          fill: "#78757a"
        }}
        viewBox="0 0 24 24"
        focusable={false}
        aria-hidden
      />
    </label>
  )
}

SearchField.propTypes = propTypes
SearchField.defaultProps = defaultProps

export default SearchField
