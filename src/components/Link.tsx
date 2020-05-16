import React, { ReactNode, FocusEvent } from "react"
import { Link as GatsbyLink } from "gatsby"

interface Props {
  to?: string
  children?: ReactNode
  partiallyActive?: boolean
  onFocus?: (event: FocusEvent<HTMLAnchorElement>) => void
  onBlur?: (event: FocusEvent<HTMLAnchorElement>) => void
}

function Link({
  children = null,
  to = "#",
  partiallyActive = false,
  ...extraProps
}: Props) {
  const isInternal = /^\/(?!\/)/.test(to)

  return isInternal ? (
    <GatsbyLink to={to} partiallyActive={partiallyActive} {...extraProps}>
      {children}
    </GatsbyLink>
  ) : (
    <a href={to} {...extraProps}>
      {children}
    </a>
  )
}

export default Link
