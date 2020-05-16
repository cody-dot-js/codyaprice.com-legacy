import React from 'react';
import { css } from '@emotion/core';
import NavigationLink from './NavigationLink';

interface Props {
  routes: Array<{ to: string; display: string }>;
}

function DesktopNavigation({ routes = [], ...otherProps }: Props) {
  return (
    <ul
      css={css`
        display: flex;
        list-style: none;
        margin: 0;
      `}
      {...otherProps}
    >
      {routes.map(({ to, display }) => (
        <NavigationLink
          key={to}
          to={to}
          css={css`
            :not(:last-of-type) {
              margin-right: 0.5rem;
            }
          `}
        >
          {display}
        </NavigationLink>
      ))}
    </ul>
  );
}

export default DesktopNavigation;
