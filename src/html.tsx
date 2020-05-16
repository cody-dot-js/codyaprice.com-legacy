import React from 'react';
import { css } from '@emotion/core';
import GlobalCss from './GlobalCss';

interface Props {
  htmlAttributes: any;
  headComponents: Array<any>;
  bodyAttributes: any;
  preBodyComponents: Array<any>;
  body: string;
  postBodyComponents: Array<any>;
}

export default function HTML({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  body,
  postBodyComponents,
}: Props) {
  return (
    <html
      {...htmlAttributes}
      css={css`
        height: 100%;
        background-color: #f5f5f5;
      `}
    >
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {headComponents}
      </head>
      <body
        {...bodyAttributes}
        css={css`
          height: 100%;
        `}
      >
        {preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <GlobalCss />
        <div
          css={css`
            height: 100%;
          `}
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
      </body>
    </html>
  );
}
