import React, { ReactNode } from "react"
import { css } from "@emotion/core"

interface Props {
  children: ReactNode
  caption?: ReactNode
}

function Example({ children, caption = null }: Props) {
  return (
    <>
      <div
        css={css`
          border: 0.25rem #c0c0c0 dashed;
          margin: 1rem 0;
          padding: 1rem;
        `}
      >
        {children}
      </div>
      {caption && (
        <>
          <br />
          <figcaption>{caption}</figcaption>
        </>
      )}
    </>
  )
}

export default Example
