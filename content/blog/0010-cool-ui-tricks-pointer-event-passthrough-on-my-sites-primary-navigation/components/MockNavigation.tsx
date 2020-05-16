import React from "react"
import { css, keyframes } from "@emotion/core"
import uniqueId from "./uniqueId"

const buttonCss = css`
  height: 4rem;
  width: 4rem;
  border-radius: 100%;
  border: 0;
  background-color: #9e579d;
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38);
  :hover {
    backgroundcolor: #fc85ae;
    boxshadow: 0 0.375rem 0.5rem 0 rgba(0, 0, 0, 0.54);
  }
`

const stripeAnimation = keyframes(css`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 2rem 4rem;
  }
`)

interface Props {
  pointerEventPassthroughEnabled: boolean
  passthroughInitialValue: boolean
}

function MockNavigation({
  pointerEventPassthroughEnabled,
  passthroughInitialValue,
}: Props) {
  const [lastClicked, setLastClicked] = React.useState(null)
  const [
    allowPointerEventPassthrough,
    setAllowPointerEventPassthrough,
  ] = React.useState(passthroughInitialValue)
  const [showNavigationBounds, setShowNavigationBounds] = React.useState(false)
  const { current: uniq } = React.useRef(uniqueId())

  const onClick = React.useCallback((event) => {
    const { name } = event.target
    const id = event.target.id.split("-")[0]

    setLastClicked(name || id)
  }, [])

  return (
    <>
      <div
        onClick={onClick}
        css={css`
          background-color: #303a52;
          width: 100%;
          height: 10rem;
          display: flex;
          align-items: center;
          position: relative;
        `}
      >
        <button
          name="background"
          css={css`
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            border: 0;
            background-color: transparent;
            background-size: 2rem 2rem;
            :hover {
              background-image:
                linear-gradient(135deg, rgba(0,0,0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0, 0.1) 50%, rgba(0,0,0, 0.1) 75%, transparent 75%, transparent);
              color: #fff;
              animation: ${stripeAnimation} 2.8s linear infinite;,
            }
            :active {
              backgroundColor: #574b90;
            }
          `}
        />
        <nav
          id={`navigation-${uniq}`}
          css={css`
            display: flex;
            justify-content: space-between;
            background-color: ${showNavigationBounds
              ? "rgba(255, 255, 255, 0.38)"
              : 0};
            padding: 1rem;
            width: 100%;
            position: relative;
            pointer-cvents: ${allowPointerEventPassthrough ? "none" : "auto"};
          `}
        >
          <button
            type="button"
            name="avatar circle"
            css={css`
              ${buttonCss}
              pointer-cvents: auto;
            `}
          />
          <button
            type="button"
            name="the link"
            css={css`
              background: 0;
              border-radius: 0.25rem;
              border: 0;
              color: #fff;
              padding: 1rem;
              pointer-events: auto;
              :hover {
                background-color: #574b90;
              }
            `}
          >
            A Link
          </button>
        </nav>
      </div>
      <label
        css={css`
          display: block;
        `}
      >
        Show navigation bounds?&nbsp;
        <input
          type="checkbox"
          onChange={() => setShowNavigationBounds((s) => !s)}
          checked={showNavigationBounds}
        />
      </label>
      {pointerEventPassthroughEnabled && (
        <label
          css={css`
            display: block;
          `}
        >
          Remove <em>"invisible wall"</em>?&nbsp;
          <input
            type="checkbox"
            onChange={() => setAllowPointerEventPassthrough((s) => !s)}
            checked={allowPointerEventPassthrough}
          />
        </label>
      )}
      <p
        css={css`
          margin: 0;
        `}
      >
        Last clicked: {lastClicked ? lastClicked : "nothing"}
      </p>
    </>
  )
}

export default MockNavigation
