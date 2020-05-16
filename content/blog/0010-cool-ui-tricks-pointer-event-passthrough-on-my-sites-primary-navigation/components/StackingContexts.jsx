import React from "react"
import FormInput from "./FormInput"

function StackingContexts() {
  const [zIndex, setZIndex] = React.useState(1)

  const onChange = (event) => setZIndex(event.target.value)

  const baseBoxStyle = {
    width: "10rem",
    height: "10rem",
  }

  return (
    <>
      <FormInput label="Green zIndex:&nbsp;">
        <input type="number" value={zIndex} onChange={onChange} />
      </FormInput>
      <div css={{ width: "100%", height: "16rem" }}>
        <div css={{ ...baseBoxStyle, backgroundColor: "#1976d2" }}>Blue</div>
        <div
          css={{
            ...baseBoxStyle,
            backgroundColor: "#d32f2f",
            position: "relative",
            zIndex: 2,
            top: "-8rem",
            right: "-4rem",
          }}
        >
          Red
        </div>
        <div
          css={{
            ...baseBoxStyle,
            backgroundColor: "#388e3c",
            position: "relative",
            zIndex,
            top: "-14rem",
          }}
        >
          Green
        </div>
      </div>
    </>
  )
}

export default StackingContexts
