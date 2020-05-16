import React, { ReactNode, RefObject } from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import Card from './Card';
import Layout from './Layout';

interface Props {
  children: ReactNode;
  headerContent?: ReactNode;
  layoutRef?: RefObject<HTMLDivElement>;
  leftSidebarContent?: ReactNode;
  rightSidebarContent?: ReactNode;
  title: ReactNode;
}

const defaultProps = {
  headerContent: null,
  layoutRef: React.createRef(),
  leftSidebarContent: null,
  location: null,
  rightSidebarContent: null,
};

function PostLayout({
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
          max-width: 50rem;
          margin: 0 auto;
        `}
      >
        <header
          css={css`
            margin: 1rem 0;
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
                color: #fff;
                text-decoration: none;
              `}
              to="/"
            >
              {title}
            </Link>
          </h1>
        </header>
        <Card
          css={css`
            background-color: #fff;
            pointer-events: auto;
            max-width: 50rem;
            margin: 0 auto;
            padding: 1rem 1.5rem;
          `}
          {...otherProps}
        >
          <MDXProvider components={{}}>{children}</MDXProvider>
        </Card>
      </div>
    </Layout>
  );
}

PostLayout.defaultProps = defaultProps;

export default PostLayout;
