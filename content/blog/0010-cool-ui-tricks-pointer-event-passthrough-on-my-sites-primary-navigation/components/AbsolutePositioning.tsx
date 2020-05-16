import React from "react"
import { css } from "@emotion/core"
import FormInput from "./FormInput"

function AbsolutePositioning() {
  const [usePositionAbsolute, setUsePositionAbsolute] = React.useState<boolean>(
    true
  )
  const [backgroundColor, setBackgroundColor] = React.useState<string>(
    "#e0e0e0"
  )
  const [color, setColor] = React.useState<string>("#000")
  const [top, setTop] = React.useState<string>("-10px")
  const [right, setRight] = React.useState<string>("")
  const [bottom, setBottom] = React.useState<string>("")
  const [left, setLeft] = React.useState<string>("-20px")

  const customizableStyles = css`
    background-color: ${backgroundColor};
    color: ${color};
    position: ${usePositionAbsolute ? "absolute" : "static"};
    top: ${top};
    right: ${right};
    bottom: ${bottom};
    left: ${left};
  `

  const onChange = (setState: React.Dispatch<React.SetStateAction<string>>) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setState(event.target.value)
  const toggle = (
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => () => setState((s) => !s)

  const positions = [
    { name: "Top", setState: onChange(setTop), value: top },
    { name: "Right", setState: onChange(setRight), value: right },
    { name: "Bottom", setState: onChange(setBottom), value: bottom },
    { name: "Left", setState: onChange(setLeft), value: left },
  ]

  return (
    <>
      <div
        css={css`
          position: relative;
          z-index: 100;
        `}
      >
        <FormInput label="Use position absolute?&nbsp;">
          <input
            type="checkbox"
            checked={usePositionAbsolute}
            onChange={toggle(setUsePositionAbsolute)}
          />
        </FormInput>
        <FormInput>
          <ul
            css={{
              display: "flex",
              justifyContent: "space-between",
              flexFlow: "row wrap",
              listStyle: "none",
              margin: 0,
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
        <p>
          Note: the movable element below will appear below these form elements
          on purpose 😉
        </p>
      </div>
      <div
        css={{
          width: "100%",
          border: "0.25rem solid black",
          padding: "1rem",
          position: "relative",
        }}
      >
        <p>
          Dolor quis excepteur dolor cillum ipsum cupidatat incididunt tempor
          non cillum anim irure occaecat.
        </p>
        <p css={customizableStyles}>Move me around!</p>
        <p>
          Fugiat velit est proident nostrud consequat est quis excepteur
          exercitation exercitation labore.
        </p>
      </div>
    </>
  )
}

export default AbsolutePositioning
