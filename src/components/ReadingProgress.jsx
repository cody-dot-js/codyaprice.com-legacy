import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"
import ProgressBar from "./ProgressBar"

const propTypes = {
  targetRef: PropTypes.shape({
    current: PropTypes.element,
  }),
}

const defaultProps = {
  targetRef: null,
}

// const style = css`
//   position: sticky;
//   top: 0;
//   z-index: 9001;
// `

const style = {
  position: "sticky",
  top: 0,
  zIndex: 9001,
}

function ReadingProgress({ targetRef }) {
  const [progress, setProgress] = React.useState(0)

  const scrollListener = React.useCallback(() => {
    const { current: target } = targetRef

    if (!target) {
      return
    }

    const totalHeight =
      target.clientHeight - target.offsetTop - window.innerHeight
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    if (windowScrollTop === 0) {
      return setProgress(0)
    }

    if (windowScrollTop > totalHeight) {
      return setProgress(100)
    }

    setProgress((windowScrollTop / totalHeight) * 100)
  }, [targetRef])

  React.useEffect(() => {
    window.addEventListener("scroll", scrollListener)

    return () => window.removeEventListener("scroll", scrollListener)
  }, [scrollListener])

  return <ProgressBar css={style} value={progress} />
}

ReadingProgress.propTypes = propTypes
ReadingProgress.defaultProps = defaultProps

export default ReadingProgress
