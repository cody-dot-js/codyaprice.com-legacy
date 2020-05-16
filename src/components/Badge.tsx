import React, { ReactNode } from "react"
import { css } from "@emotion/core"

interface Props {
  children?: ReactNode
  color?: string
}

function Badge({ children = null, color = "#a44fb6", ...extraProps }: Props) {
  return (
    <div
      css={css`
        padding: 0.5rem;
        color: ${color};
        border-radius: 0.5rem;
        border: 1px solid ${color};
        font-size: 0.75rem;
      `}
      {...extraProps}
    >
      {children}
    </div>
  )
}

export default Badge
