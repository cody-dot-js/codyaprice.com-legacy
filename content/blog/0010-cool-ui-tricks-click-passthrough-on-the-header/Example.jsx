import React from "react"
import { keyframes, css } from "@emotion/core"
import uniqueId from "./uniqueId"

const buttonCss = {
  height: "4rem",
  width: "4rem",
  borderRadius: "100%",
  border: 0,
  backgroundColor: "#9e579d",
  boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38)",
  ":hover": {
    backgroundColor: "#fc85ae",
    boxShadow: "0 0.375rem 0.5rem 0 rgba(0, 0, 0, 0.54)"
  }
}

const stripeAnimation = keyframes({
  "0%": { backgroundPosition: "0 0" },
  "100%": { backgroundPosition: "2rem 4rem" }
})

function Example({ pointerEventPassthroughEnabled, passthroughInitialValue }) {
  const [lastClicked, setLastClicked] = React.useState(null)
  const [
    allowPointerEventPassthrough,
    setAllowPointerEventPassthrough
  ] = React.useState(passthroughInitialValue)
  const [showNavigationBounds, setShowNavigationBounds] = React.useState(false)
  const { current: uniq } = React.useRef(uniqueId())

  const onClick = React.useCallback(event => {
    const { name } = event.target
    const id = event.target.id.split("-")[0]

    setLastClicked(name || id)
  }, [])

  return (
    <div
      css={{
        border: "0.25rem #c0c0c0 dashed",
        padding: "1rem",
        margin: "1rem 0"
      }}
    >
      <div
        onClick={onClick}
        css={{
          backgroundColor: "#303a52",
          width: "100%",
          height: "10rem",
          display: "flex",
          alignItems: "center",
          position: "relative"
        }}
      >
        <button
          name="background"
          css={{
            display: "block",
            position: "absolute",
            width: "100%",
            height: "100%",
            border: 0,
            backgroundColor: "transparent",
            backgroundSize: "2rem 2rem",
            ":hover": {
              backgroundImage:
                "linear-gradient(135deg, rgba(0,0,0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0, 0.1) 50%, rgba(0,0,0, 0.1) 75%, transparent 75%, transparent)",
              color: "#fff",
              animation: `${stripeAnimation} 2.8s linear infinite`
            },
            ":active": {
              backgroundColor: "#574b90"
            }
          }}
        />
        <nav
          id={`navigation-${uniq}`}
          css={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: showNavigationBounds
              ? "rgba(255, 255, 255, 0.38)"
              : 0,
            padding: "1rem",
            width: "100%",
            position: "relative",
            pointerEvents: allowPointerEventPassthrough ? "none" : "auto"
          }}
        >
          <button
            type="button"
            name="avatar circle"
            css={{
              ...buttonCss,
              pointerEvents: "auto"
            }}
          />
          <button
            type="button"
            name="the link"
            css={{
              background: 0,
              borderRadius: "0.25rem",
              border: 0,
              color: "#fff",
              padding: "1rem",
              pointerEvents: "auto",
              ":hover": {
                backgroundColor: "#574b90"
              }
            }}
          >
            A Link
          </button>
        </nav>
      </div>
      <label css={{ display: "block" }}>
        Show navigation bounds?&nbsp;
        <input
          type="checkbox"
          onChange={() => setShowNavigationBounds(s => !s)}
          checked={showNavigationBounds}
        />
      </label>
      {pointerEventPassthroughEnabled && (
        <label css={{ display: "block" }}>
          Remove <em>"invisible wall"</em>?&nbsp;
          <input
            type="checkbox"
            onChange={() => setAllowPointerEventPassthrough(s => !s)}
            checked={allowPointerEventPassthrough}
          />
        </label>
      )}
      <p css={{ margin: 0 }}>
        Last clicked: {lastClicked ? lastClicked : "nothing"}
      </p>
    </div>
  )
}

Example.defaultProps = {
  allowPointerEventPassthrough: false,
  passthroughInitialValue: false
}

export default Example
