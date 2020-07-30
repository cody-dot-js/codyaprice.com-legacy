import React from 'react';
import { css } from '@emotion/core';
import { Layout, SEO, Bio } from '../components';

function AboutPage() {
  return (
    <Layout>
      <SEO title="About Me" />
      <Bio
        css={css`
          margin-bottom: 6rem;
        `}
      />
    </Layout>
  );
}

export default AboutPage;
