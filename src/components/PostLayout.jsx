import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { MDXProvider } from "@mdx-js/react"

import Card from "./Card"
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

function PostLayout({
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
      <header
        css={{
          margin: "1rem 0"
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
              color: "#fff",
              textDecoration: "none"
            }}
            to="/"
          >
            {title}
          </Link>
        </h1>
      </header>
      <Card
        css={{ backgroundColor: "#fff", pointerEvents: "auto" }}
        {...otherProps}
      >
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </Card>
    </Layout>
  )
}

PostLayout.propTypes = propTypes
PostLayout.defaultProps = defaultProps

export default PostLayout
