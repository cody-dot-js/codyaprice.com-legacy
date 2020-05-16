import React, { ReactNode } from 'react';
import { css } from '@emotion/core';

interface Props {
  children?: ReactNode;
}

const style = css`
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38);
  margin: 1rem 0;
  padding: 1rem;
`;

function Card({ children = null, ...otherProps }: Props) {
  return (
    <div {...otherProps} css={style}>
      {children}
    </div>
  );
}

export { style as CardCss };

export default Card;
