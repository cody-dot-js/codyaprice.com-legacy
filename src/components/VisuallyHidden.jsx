import React from "react"
import { css } from "@emotion/core"

const style = css`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;

  // https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
  white-space: nowrap;
  word-wrap: normal;
`

function VisuallyHidden(props) {
  return <span css={style} {...props} />
}

export default VisuallyHidden
