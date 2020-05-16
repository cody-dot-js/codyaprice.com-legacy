import React from "react"
import { css } from "@emotion/core"
import FormInput from "./FormInput"

function RelativePositioning() {
  const [usePositionRelative, setUsePositionRelative] = React.useState<boolean>(
    true
  )
  const [backgroundColor, setBackgroundColor] = React.useState<string>(
    "#e0e0e0"
  )
  const [color, setColor] = React.useState<string>("#000")
  const [top, setTop] = React.useState<string>("0")
  const [right, setRight] = React.useState<string>("0")
  const [bottom, setBottom] = React.useState<string>("0")
  const [left, setLeft] = React.useState<string>("0")

  const customizableStyles = css`
    background-color: ${backgroundColor};
    color: ${color};
    position: ${usePositionRelative ? "relative" : "static"};,
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
        <FormInput label="Use position relative?&nbsp;">
          <input
            type="checkbox"
            checked={usePositionRelative}
            onChange={toggle(setUsePositionRelative)}
          />
        </FormInput>
        <FormInput>
          <ul
            css={css`
              display: flex;
              justify-content: space-between;
              flex-flow: row wrap;
              list-style: none;
              margin: 0;
            `}
          >
            {positions.map(({ name, value, setState }) => (
              <li key={name}>
                {name}:&nbsp;
                <input
                  type="text"
                  css={css`
                    width: 4rem;
                  `}
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
        css={css`
          width: 100%;
          border: 0.25rem solid black;
          padding: 1rem;
        `}
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

export default RelativePositioning
