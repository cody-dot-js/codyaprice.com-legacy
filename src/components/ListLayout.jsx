import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { MDXProvider } from "@mdx-js/react"

import Layout from "./Layout"
import * as mdxComponents from "./mdx"

const propTypes = {
  children: PropTypes.node.isRequired,
  headerContent: PropTypes.node,
  layoutRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  leftSidebarContent: PropTypes.node,
  location: PropTypes.object,
  rightSidebarContent: PropTypes.node,
  title: PropTypes.string.isRequired
}

const defaultProps = {
  headerContent: null,
  layoutRef: React.createRef(),
  leftSidebarContent: null,
  location: null,
  rightSidebarContent: null
}

function ListLayout({
  children,
  headerContent,
  layoutRef,
  leftSidebarContent,
  location,
  rightSidebarContent,
  title,
  ...otherProps
}) {
  return (
    <Layout
      layoutRef={layoutRef}
      leftSidebarContent={leftSidebarContent}
      rightSidebarContent={rightSidebarContent}
    >
      <div css={{ margin: "0 auto" }}>
        <header
          css={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            marginTop: "1rem"
          }}
        >
          <h1
            css={{
              margin: 0,
              pointerEvents: "auto"
            }}
          >
            <Link
              css={{
                boxShadow: "none",
                textDecoration: "none",
                color: "#fff"
              }}
              to="/"
            >
              {title}
            </Link>
          </h1>
          <div css={{ pointerEvents: "auto" }}>{headerContent}</div>
        </header>
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </div>
    </Layout>
  )
}

ListLayout.propTypes = propTypes
ListLayout.defaultProps = defaultProps

export default ListLayout
