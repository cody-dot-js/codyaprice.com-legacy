import React from 'react';
import { css } from '@emotion/core';

interface Props extends HTMLImageElement {
  alt: string;
  caption?: React.ReactNode;
}

export type ImgProps = Props;

export function Img({ src, alt }: Props) {
  return (
    <img
      css={css`
        margin: 0 auto;
      `}
      alt={alt}
      src={src}
      loading="lazy"
    />
  );
}
