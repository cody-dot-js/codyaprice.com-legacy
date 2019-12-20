import React from "react"

function FormInput({ children, label }) {
  return (
    <label css={{ display: "block", marginBottom: "0.5rem" }}>
      {label}
      {children}
    </label>
  )
}

function RelativePositioning() {
  const [usePositionRelative, setUsePositionRelative] = React.useState(true)
  const [backgroundColor, setBackgroundColor] = React.useState("#e0e0e0")
  const [color, setColor] = React.useState("#000")
  const [top, setTop] = React.useState(0)
  const [right, setRight] = React.useState(0)
  const [bottom, setBottom] = React.useState(0)
  const [left, setLeft] = React.useState(0)

  const customizableStyles = {
    backgroundColor,
    color,
    position: usePositionRelative ? "relative" : "static",
    top,
    right,
    bottom,
    left
  }

  const onChange = setState => event => setState(event.target.value)
  const toggle = setState => () => setState(s => !s)

  const positions = [
    { name: "Top", setState: onChange(setTop), value: top },
    { name: "Right", setState: onChange(setRight), value: right },
    { name: "Bottom", setState: onChange(setBottom), value: bottom },
    { name: "Left", setState: onChange(setLeft), value: left }
  ]

  return (
    <>
      <FormInput label="Use position: relative;?&nbsp;">
        <input
          type="checkbox"
          checked={usePositionRelative}
          onChange={toggle(setUsePositionRelative)}
        />
      </FormInput>
      <FormInput>
        <ul
          css={{
            display: "flex",
            justifyContent: "space-between",
            flexFlow: "row wrap",
            listStyle: "none",
            margin: 0
          }}
        >
          {positions.map(({ name, value, setState }) => (
            <li key={name}>
              {name}:&nbsp;
              <input
                type="text"
                css={{ width: "4rem" }}
                value={value}
                onChange={setState}
              />
            </li>
          ))}
        </ul>
      </FormInput>
      <FormInput label="Background color:&nbsp;">
        <input
          type="text"
          value={backgroundColor}
          onChange={onChange(setBackgroundColor)}
        />
      </FormInput>
      <FormInput label="Color:&nbsp;">
        <input type="text" value={color} onChange={onChange(setColor)} />
      </FormInput>
      <div css={{ width: "100%" }}>
        <p>
          Dolor quis excepteur dolor cillum ipsum cupidatat incididunt tempor
          non cillum anim irure occaecat.
        </p>
        <p css={customizableStyles}>Move me around!</p>
      </div>
    </>
  )
}

export default RelativePositioning
