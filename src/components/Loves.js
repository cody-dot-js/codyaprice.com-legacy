import React from "react"
import { css, keyframes } from "@emotion/core"
import { MdFavorite, MdFavoriteBorder } from "react-icons/md"

const heartBeat = keyframes`
  0% {
    opacity: 0;
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 66, 114, 1);
  }

  38% {
    opacity: 1;
  }

  54% {
    opacity: 1;
    transform: scale(1.25);
    box-shadow: 0 0 0 4px rgba(255, 66, 114, 0.01);
  }

  87% {
    opacity: 0;
  }

  100% {
    opacity: 0;
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
`

function Loves({ count, onClick, ...otherProps }) {
  const [isFocused, setIsFocused] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)
  const animationCount = React.useRef(0)
  const [animations, setAnimations] = React.useState([])

  const truncatedCount = React.useMemo(() => {
    if (count < 1000) {
      return count
    } else {
      const thousands = Math.floor(count / 1000)
      const hundreds = Math.floor((count / 100) % 10)
      const decimal = hundreds > 0 ? `.${hundreds}` : ""

      return `${thousands}${decimal}K`
    }
  }, [count])

  const onLove = React.useCallback(() => {
    if (onClick) {
      onClick()
    }

    setAnimations(a => {
      const { current: id } = animationCount
      animationCount.current += 1
      return a.concat(id)
    })
  }, [onClick])

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        padding-block: 0.5rem;
      `}
      {...otherProps}
    >
      <button
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        css={css`
          background: transparent;
          border-radius: 50%;
          border: 0;
          cursor: pointer;
          font-size: 2rem;
          line-height: 1rem;
          margin-right: 0.25rem;
          outline: 0;
          padding: 0.25rem;
          position: relative;
        `}
        onClick={onLove}
      >
        <MdFavoriteBorder
          css={css`
            fill: ${isHovered
              ? "rgba(255, 66, 114, 1)"
              : isFocused
              ? "rgba(255, 46, 99, 1)"
              : "rgba(0, 0, 0, 0.54)"};
          `}
        />
        {animations.map(n => (
          <div
            key={`anim-${n}`}
            css={css`
              animation: ${heartBeat} 667ms 1 cubic-bezier(0.1, 0.12, 0.25, 1);
              border-radius: 50%;
              left: 0;
              padding: 0.25rem;
              position: absolute;
              top: 0;
              z-index: 1;
            `}
            onAnimationEnd={() =>
              setAnimations(a => {
                return a.filter(i => i !== n)
              })
            }
          >
            <MdFavorite
              css={css`
                filter: drop-shadow;
                fill: rgba(255, 66, 114, 1);
              `}
            />
          </div>
        ))}
      </button>
      <span>
        {truncatedCount}&nbsp;
        <span
          css={css`
            font-family: Damion, cursive;
          `}
        >
          loves
        </span>
      </span>
    </div>
  )
}

export default Loves
