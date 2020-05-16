import React, { ReactNode } from "react"
import { css } from "@emotion/core"

interface Props {
  children: ReactNode
  label?: ReactNode
}

function FormInput({ children, label = null }: Props) {
  return (
    <label
      css={css`
        display: block;
        margin-bottom: 0.5rem;
      `}
    >
      {label}
      {children}
    </label>
  )
}

export default FormInput
