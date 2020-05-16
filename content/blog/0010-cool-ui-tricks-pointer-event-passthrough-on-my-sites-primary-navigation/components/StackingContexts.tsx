import React from "react"
import { css } from "@emotion/core"
import FormInput from "./FormInput"

function StackingContexts() {
  const [zIndex, setZIndex] = React.useState<string>("1")

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setZIndex(event.target.value)

  const baseBoxStyle = css`
    width: 10rem;
    height: 10rem;
  `

  return (
    <>
      <FormInput label="Green zIndex:&nbsp;">
        <input type="number" value={zIndex} onChange={onChange} />
      </FormInput>
      <div
        css={css`
          width: 100%;
          height: 16rem;
        `}
      >
        <div
          css={css`
            ${baseBoxStyle} background-color: #1976d2;
          `}
        >
          Blue
        </div>
        <div
          css={css`
            ${baseBoxStyle}
            background-color: #d32f2f;
            position: relative;
            z-index: 2;
            top: -8rem;
            right: -4rem;
          `}
        >
          Red
        </div>
        <div
          css={css`
            ${baseBoxStyle}
            background-color: #388e3c;
            position: relative;
            z-index: ${zIndex};
            top: -14rem;
          `}
        >
          Green
        </div>
      </div>
    </>
  )
}

export default StackingContexts
