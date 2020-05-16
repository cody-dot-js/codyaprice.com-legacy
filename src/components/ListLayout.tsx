import React, { ReactNode, RefObject } from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import Layout from "./Layout"

interface Props {
  children: ReactNode
  headerContent?: ReactNode
  layoutRef: RefObject<HTMLDivElement>
  leftSidebarContent?: ReactNode
  rightSidebarContent?: ReactNode
  title: ReactNode
}

const defaultProps = {
  headerContent: null,
  layoutRef: React.createRef(),
  leftSidebarContent: null,
  location: null,
  rightSidebarContent: null,
}

function ListLayout({
  children,
  headerContent,
  layoutRef,
  leftSidebarContent,
  rightSidebarContent,
  title,
  ...otherProps
}: Props) {
  return (
    <Layout
      layoutRef={layoutRef}
      leftSidebarContent={leftSidebarContent}
      rightSidebarContent={rightSidebarContent}
    >
      <div
        css={css`
          margin: 0 auto;
        `}
      >
        <header
          css={css`
            align-items: center;
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            margin-top: 1rem;
          `}
        >
          <h1
            css={css`
              margin: 0;
              pointer-events: auto;
            `}
          >
            <Link
              css={css`
                box-shadow: none;
                text-decoration: none;
                color: #fff;
              `}
              to="/"
            >
              {title}
            </Link>
          </h1>
          <div
            css={css`
              pointer-events: auto;
            `}
          >
            {headerContent}
          </div>
        </header>
        <MDXProvider>{children}</MDXProvider>
      </div>
    </Layout>
  )
}

ListLayout.defaultProps = defaultProps

export default ListLayout
