import React, { ChangeEvent } from "react"
import { css } from "@emotion/core"
import { MdSearch, MdClose } from "react-icons/md"

interface Props {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
  placeholder: string
  title: string
  value?: string
}

function SearchField({
  onChange,
  onClear,
  placeholder,
  title,
  value,
  ...otherProps
}: Props) {
  const [_value, setValue] = React.useState<string>("")
  const isControlledInput = value !== undefined
  const searchValue = isControlledInput ? value : _value

  const handleChange = React.useCallback(
    (event) => {
      if (!isControlledInput) {
        setValue(event.target.value)
      }

      onChange?.(event)
    },
    [isControlledInput, onChange]
  )

  const handleClear = React.useCallback(() => {
    if (!isControlledInput) {
      setValue("")
    }

    onClear?.()
  }, [isControlledInput, onClear])

  const isClearDisabled = _value.length === 0

  return (
    <label
      css={css`
        position: relative;
        margin-bottom: 1rem;
        display: block;
      `}
      {...otherProps}
    >
      <input
        css={css`
          display: block;
          color: rgba(0, 0, 0, 0.87);
          background-color: #f5f5f5;
          font-size: 1rem;
          font-weight: 400;
          line-height: 2.25rem;
          padding: 0;
          padding-right: 3rem;
          padding-left: 2rem;
          vertical-align: middle;
          width: 100%;
          border-width: 0;
          border-radius: 0.25rem;
          overflow: hidden;
          :focus {
            background-color: #fff;
            box-shadow: 0 0 0 2px #3d84a8;
            outline: 0;
          }
        `}
        type="search"
        placeholder={placeholder}
        aria-label={title}
        title={title}
        value={searchValue}
        onChange={handleChange}
      />
      <MdSearch
        css={css`
          display: block;
          color: #78757a;
          width: 1.5rem;
          height: 1.5rem;
          position: absolute;
          left: 0.25rem;
          top: 0.375rem;
          pointer-events: none;
          fill: #78757a;
        `}
        viewBox="0 0 24 24"
        focusable={false}
        aria-hidden
      />
      <button
        type="button"
        css={css`
          display: block;
          border: 0;
          :hover {
          }
          background: 0;
          position: absolute;
          right: 0.25rem;
          top: 0.375rem;
          cursor: pointer;
          visibility: ${isClearDisabled ? "hidden" : "visible"};
        `}
        disabled={isClearDisabled}
        onClick={handleClear}
      >
        <MdClose
          css={css`
            display: block;
            fill: #78757a;
            width: 1.5rem;
            height: 1.5rem;
          `}
          viewBox="0 0 24 24"
          aria-label="Clear"
        />
      </button>
    </label>
  )
}

export default SearchField
