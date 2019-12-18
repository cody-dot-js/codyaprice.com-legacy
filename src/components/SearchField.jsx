import React from "react"
import PropTypes from "prop-types"
import { MdSearch, MdClose } from "react-icons/md"

const propTypes = {
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string
}

const defaultProps = {
  onChange: null,
  onClear: null,
  value: undefined
}

function SearchField(props) {
  const { onChange, onClear, placeholder, title, value, ...otherProps } = props
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

  const handleClear = React.useCallback(() => {
    if (!isControlledInput) {
      setValue("")
    }

    if (onClear) {
      onClear()
    }
  }, [isControlledInput, onClear])

  const isClearDisabled = value.length === 0

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
        placeholder={placeholder}
        aria-label={title}
        title={title}
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
      <button
        type="button"
        css={{
          display: "block",
          border: 0,
          ":hover": {},
          background: 0,
          position: "absolute",
          right: "0.25rem",
          top: "0.375rem",
          cursor: "pointer",
          visibility: isClearDisabled ? "hidden" : "visible"
        }}
        disabled={isClearDisabled}
        onClick={handleClear}
      >
        <MdClose
          css={{
            display: "block",
            fill: "#78757a",
            width: "1.5rem",
            height: "1.5rem"
          }}
          viewBox="0 0 24 24"
          aria-label="Clear"
        />
      </button>
    </label>
  )
}

SearchField.propTypes = propTypes
SearchField.defaultProps = defaultProps

export default SearchField
