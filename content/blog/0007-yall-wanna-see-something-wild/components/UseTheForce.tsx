import React from "react"
import { css } from "@emotion/core"

function useForceUpdate() {
  const [, forceUpdate] = React.useState<boolean>(false)

  return React.useCallback(() => {
    forceUpdate((s) => !s)
  }, [])
}

export default function UseTheForce() {
  const forceUpdate = useForceUpdate()
  const renderCount = React.useRef(0)

  React.useEffect(() => {
    renderCount.current += 1
  })

  const onClick = React.useCallback(() => {
    forceUpdate()
  }, [forceUpdate])

  return (
    <div
      css={css`
        text-align: center;
        padding: 0.5rem;
        border: 0.25rem dashed;
      `}
    >
      <button type="button" onClick={onClick}>
        Use the Force 👋
      </button>
      <div>Render count: {renderCount.current}</div>
    </div>
  )
}
