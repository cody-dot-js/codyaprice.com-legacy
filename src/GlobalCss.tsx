import React from 'react';
import { Global, css } from '@emotion/core';

function GlobalCss() {
  return (
    <Global
      styles={css`
        a {
          color: #8a4baf;
        }

        a:link {
        }

        a:visited {
        }

        a:focus {
        }

        a:hover {
        }

        a:active {
        }

        button {
          cursor: pointer;
        }

        article,
        aside,
        footer,
        header,
        img,
        main,
        nav,
        section {
          display: block;
        }
      `}
    />
  );
}

export default GlobalCss;
