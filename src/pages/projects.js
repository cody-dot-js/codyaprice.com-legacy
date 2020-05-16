import React from 'react';
import { graphql } from 'gatsby';

import { PostLayout, SEO } from '../components';

function ProjectsPage({ data, location }) {
  return (
    <PostLayout location={location} title="Projects">
      <SEO title="Projects" />
      <p>
        <span role="img" aria-label="construction sign">
          🚧
        </span>
        &nbsp;Construction&nbsp;
        <span role="img" aria-label="construction sign">
          🚧
        </span>
      </p>
      <hr />
      <p>It's</p>
    </PostLayout>
  );
}

export default ProjectsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
