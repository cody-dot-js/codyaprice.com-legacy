import React from "react"

function useForceUpdate() {
  const [, forceUpdate] = React.useState()

  return React.useCallback(() => {
    forceUpdate(s => !s)
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
      style={{
        textAlign: "center",
        padding: 10,
        border: "3px dashed",
      }}
    >
      <button type="button" onClick={onClick}>
        Use the Force&nbsp;
        <span role="img" aria-label="wave emoji">
          👋
        </span>
      </button>
      <div>Render count: {renderCount.current}</div>
    </div>
  )
}
