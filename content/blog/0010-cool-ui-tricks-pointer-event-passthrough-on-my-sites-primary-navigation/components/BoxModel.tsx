import React from "react"
import { css } from "@emotion/core"
import FormInput from "./FormInput"

interface SummaryProps {
  title: React.ReactNode | string
  height: string | number
  width: string | number
}

function Summary({ height, title, width }: SummaryProps) {
  return (
    <div>
      <h4>{title}</h4>
      <p>Height: {height} px</p>
      <p>Width: {width} px</p>
    </div>
  )
}

function BoxModel() {
  const contentBoxRef = React.useRef<HTMLDivElement>(null)
  const borderBoxRef = React.useRef<HTMLDivElement>(null)

  const [backgroundColor, setBackgroundColor] = React.useState("#303030")
  const [borderColor, setBorderColor] = React.useState("#f00")
  const [borderWidth, setBorderWidth] = React.useState("4px")
  const [color, setColor] = React.useState("#fff")
  const [height, setHeight] = React.useState("80px")
  const [padding, setPadding] = React.useState("20px")
  const [width, setWidth] = React.useState("120px")
  const [contentBoxSize, setContentBoxSize] = React.useState({
    height: 0,
    width: 0,
  })
  const [borderBoxSize, setBorderBoxSize] = React.useState({
    height: 0,
    width: 0,
  })

  const baseBoxStyles = {
    borderStyle: "solid",
  }

  const customizableBoxStyles = {
    backgroundColor,
    borderColor,
    borderWidth,
    color,
    height,
    padding,
    width,
  }

  React.useEffect(() => {
    const { current: contentBox } = contentBoxRef
    const { current: borderBox } = borderBoxRef

    setContentBoxSize({
      height: contentBox?.scrollHeight ?? 0,
      width: contentBox?.scrollWidth ?? 0,
    })

    setBorderBoxSize({
      height: borderBox?.scrollHeight ?? 0,
      width: borderBox?.scrollWidth ?? 0,
    })
  }, [borderWidth, height, padding, width])

  const onChange = (setState: React.Dispatch<React.SetStateAction<string>>) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setState(event.target.value)

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
      `}
    >
      <div>
        <FormInput label="Background color:&nbsp;">
          <input
            type="text"
            value={backgroundColor}
            onChange={onChange(setBackgroundColor)}
          />
        </FormInput>
        <FormInput label="Border color:&nbsp;">
          <input
            type="text"
            value={borderColor}
            onChange={onChange(setBorderColor)}
          />
        </FormInput>
        <FormInput label="Border width:&nbsp;">
          <input
            type="text"
            value={borderWidth}
            onChange={onChange(setBorderWidth)}
          />
        </FormInput>
        <FormInput label="Color:&nbsp;">
          <input type="text" value={color} onChange={onChange(setColor)} />
        </FormInput>
        <FormInput label="Height:&nbsp;">
          <input type="text" value={height} onChange={onChange(setHeight)} />
        </FormInput>
        <FormInput label="Padding:&nbsp;">
          <input type="text" value={padding} onChange={onChange(setPadding)} />
        </FormInput>
        <FormInput label="Width:&nbsp;">
          <input type="text" value={width} onChange={onChange(setWidth)} />
        </FormInput>
        <p>Note: 1rem === 16px</p>
      </div>
      <hr />
      <h3>Summary</h3>
      <div
        css={css`
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: 1fr 1fr;
        `}
      >
        <Summary title="Content Box" {...contentBoxSize} />
        <Summary title="Border Box" {...borderBoxSize} />
      </div>
      <div
        css={css`
          border: 1px dashed;
          margin: 0 auto;
          padding: 1rem;
          width: fit-content;
        `}
      >
        <div
          ref={contentBoxRef}
          css={{
            ...baseBoxStyles,
            ...customizableBoxStyles,
            boxSizing: "content-box",
            marginBottom: "1rem",
          }}
        >
          Content box (initial & default value)
        </div>
        <div
          ref={borderBoxRef}
          css={{
            ...baseBoxStyles,
            ...customizableBoxStyles,
            boxSizing: "border-box",
          }}
        >
          Border box
        </div>
      </div>
    </div>
  )
}

export default BoxModel
