import React from "react"
import { css, keyframes } from "@emotion/core"
import { MdMenu, MdClose } from "react-icons/md"
import useToggle from "../../hooks/useToggle"
import NavigationLink from "./NavigationLink"

interface Props {
  color?: string
  routes: Array<{ to: string; display: string }>
}

const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`

function MobileNavigation({
  color = "#fff",
  routes = [],
  ...otherProps
}: Props) {
  const [isOpen, toggleIsOpen] = useToggle(false)

  const openContainerCss = css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #303a52;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 100;
  `

  return (
    <div css={isOpen ? openContainerCss : {}} {...otherProps}>
      <button
        type="button"
        onClick={toggleIsOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        css={css`
          color: ${color};
          font-size: 2rem;
          background: 0;
          border: 0;
          // outline: 0;
          vertical-align: middle;
          line-height: 0;
          padding: 0;
          margin: 0;
          right: 1rem;
          top: 1.5rem;
          position: ${isOpen ? "absolute" : "static"};
        `}
      >
        {isOpen ? (
          <MdClose
            css={css`
              animation: ${fadeIn} 300ms;
            `}
          />
        ) : (
          <MdMenu
            css={css`
              animation: ${fadeIn} 300ms;
            `}
          />
        )}
      </button>
      {isOpen && (
        <ul
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            margin: 0;
            list-style: none;
            width: 100%;
          `}
        >
          <NavigationLink to="/" partiallyActive={false}>
            Home
          </NavigationLink>
          {routes.map(({ to, display }) => (
            <li
              key={to}
              css={css`
                margin: 1rem;
                :last-of-type {
                  margin-bottom: 0;
                }
              `}
            >
              <NavigationLink to={to}>{display}</NavigationLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MobileNavigation
