import React from 'react';
import { graphql } from 'gatsby';

import { PostLayout, SEO } from '../components';

function PhotographyPage({ location }) {
  return (
    <PostLayout location={location} title="Photography">
      <SEO title="Photography" />
      <p>
        Photography portfolio coming soon..
      </p>
    </PostLayout>
  );
}

export default PhotographyPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
