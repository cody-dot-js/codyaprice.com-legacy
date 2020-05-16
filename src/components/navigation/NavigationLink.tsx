import React, { ReactNode } from "react"
import { css } from "@emotion/core"
import Link from "../Link"

interface Props {
  to?: string
  children?: ReactNode
  activeClassName?: string
  partiallyActive?: boolean
}

const style = css`
  text-decoration: none;
  color: #fff;
  border-radius: 0.25rem;
  padding: 0.5rem;
  transition: all 0.125s ease-in-out;
  &:hover,
  &:focus {
    background: #574b90;
    box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38);
  }
  &.active {
    background: #a44fb6;
    box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38);
  }
`

function NavigationLink({
  children = null,
  to = "#",
  activeClassName = "active",
  ...extraProps
}: Props) {
  return (
    <Link
      css={style}
      to={to}
      partiallyActive
      activeClassName={activeClassName}
      {...extraProps}
    >
      {children}
    </Link>
  )
}

export default NavigationLink
