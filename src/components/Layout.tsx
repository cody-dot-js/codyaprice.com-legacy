import React, { ReactNode } from 'react';
import { css } from '@emotion/core';

import Navigation from './navigation';
import SiteFooter from './SiteFooter';
import { mediaQueries } from './breakpoints';

interface Props {
  children: ReactNode;
  layoutRef?: React.RefObject<HTMLDivElement>;
  leftSidebarContent?: ReactNode;
  rightSidebarContent?: ReactNode;
}

const defaultProps = {
  layoutRef: React.createRef(),
  leftSidebarContent: null,
  rightSidebarContent: null,
};

function Layout({
  children,
  layoutRef,
  leftSidebarContent,
  rightSidebarContent,
  ...otherProps
}: Props) {
  return (
    <div
      ref={layoutRef}
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        /*
          For min-height, use 100vh instead of 100%
          because of the weird reach router wrapper div
        */
        min-height: 100vh;
        width: 100%;

        ${mediaQueries.desktop} {
          display: grid;
          grid-template-columns: 1fr 67% 1fr;
          grid-template-rows: 1fr auto;
          grid-column-gap: 1rem;
        }
      `}
    >
      <div
        css={css`
          background: #303a52;
          clip-path: polygon(0 0, 100% 0, 100% 15rem, 0 30rem);
          height: 30rem;
          position: absolute;
          top: 0;
          width: 100%;
          z-index: 0;
        `}
      />
      <div>{leftSidebarContent}</div>
      <div
        css={css`
          padding: 0 1rem;
          /* position relative for free z-index stacking */
          position: relative;
          margin-bottom: -4rem;

          ${mediaQueries.desktop} {
            padding: 0;
          }
        `}
      >
        <Navigation />
        <main
          css={css`
            display: block;
          `}
          role="main"
          {...otherProps}
        >
          {children}
        </main>
      </div>
      <div>{rightSidebarContent}</div>
      <SiteFooter
        css={css`
          grid-column-start: 1;
          grid-column-end: 4;
          grid-row-start: 3;
          grid-rowend: 4;
        `}
      />
    </div>
  );
}

Layout.defaultProps = defaultProps;

export default Layout;
