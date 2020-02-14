import React from "react"
import FormInput from "./FormInput"

function Summary({ height, title, width }) {
  return (
    <div>
      <h4>{title}</h4>
      <p>Height: {height} px</p>
      <p>Width: {width} px</p>
    </div>
  )
}

function BoxModel() {
  const contentBoxRef = React.useRef()
  const borderBoxRef = React.useRef()

  const [backgroundColor, setBackgroundColor] = React.useState("#303030")
  const [borderColor, setBorderColor] = React.useState("#f00")
  const [borderWidth, setBorderWidth] = React.useState("4px")
  const [color, setColor] = React.useState("#fff")
  const [height, setHeight] = React.useState("80px")
  const [padding, setPadding] = React.useState("20px")
  const [width, setWidth] = React.useState("120px")
  const [contentBoxSize, setContentBoxSize] = React.useState({
    height: 0,
    width: 0
  })
  const [borderBoxSize, setBorderBoxSize] = React.useState({
    height: 0,
    width: 0
  })

  const baseBoxStyles = {
    borderStyle: "solid"
  }

  const customizableBoxStyles = {
    backgroundColor,
    borderColor,
    borderWidth,
    color,
    height,
    padding,
    width
  }

  React.useEffect(() => {
    const { current: contentBox } = contentBoxRef
    const { current: borderBox } = borderBoxRef

    setContentBoxSize({
      height: contentBox.scrollHeight,
      width: contentBox.scrollWidth
    })

    setBorderBoxSize({
      height: borderBox.scrollHeight,
      width: borderBox.scrollWidth
    })
  }, [borderWidth, height, padding, width])

  const onChange = setState => event => setState(event.target.value)

  return (
    <div css={{ width: "100%", position: "relative" }}>
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
        css={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "1rem"
        }}
      >
        <Summary title="Content Box" {...contentBoxSize} />
        <Summary title="Border Box" {...borderBoxSize} />
      </div>
      <div
        css={{
          margin: "0 auto",
          width: "fit-content",
          border: "1px dashed",
          padding: "1rem"
        }}
      >
        <div
          ref={contentBoxRef}
          css={{
            ...baseBoxStyles,
            ...customizableBoxStyles,
            boxSizing: "content-box",
            marginBottom: "1rem"
          }}
        >
          Content box (initial & default value)
        </div>
        <div
          ref={borderBoxRef}
          css={{
            ...baseBoxStyles,
            ...customizableBoxStyles,
            boxSizing: "border-box"
          }}
        >
          Border box
        </div>
      </div>
    </div>
  )
}

export default BoxModel
