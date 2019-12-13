import React from "react"
import PropTypes from "prop-types"
import ProgressBar from "./ProgressBar"

const propTypes = {
  targetRef: PropTypes.shape({
    current: PropTypes.element
  }),
  calcFromTopOfTarget: PropTypes.bool
}

const defaultProps = {
  targetRef: null,
  calcFromTopOfTarget: true
}

const style = {
  position: "sticky",
  top: 0,
  zIndex: 9001
}

function ReadingProgress({ targetRef, calcFromTopOfTarget }) {
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

    const scrollDistance = calcFromTopOfTarget
      ? windowScrollTop - target.offsetTop
      : windowScrollTop

    if (scrollDistance <= 0) {
      return setProgress(0)
    }

    if (scrollDistance >= totalHeight) {
      return setProgress(100)
    }

    setProgress((scrollDistance / totalHeight) * 100)
  }, [calcFromTopOfTarget, targetRef])

  React.useEffect(() => {
    window.addEventListener("scroll", scrollListener)

    return () => window.removeEventListener("scroll", scrollListener)
  }, [scrollListener])

  return <ProgressBar css={style} value={progress} />
}

ReadingProgress.propTypes = propTypes
ReadingProgress.defaultProps = defaultProps

export default ReadingProgress
