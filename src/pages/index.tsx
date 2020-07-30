import React from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';

import { Bio, Layout, SEO, PostCard } from '../components';

interface Props {
  data: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

function PortfolioIndex({ data }: Props) {
  const { node: latestPost } = data.allMdx.edges[0];

  return (
    <Layout>
      <SEO title="Cody Price's Portfolio Site" />
      <Bio />
      <hr />
      <section
        css={css`
          max-width: 50rem;
          margin: 0 auto;
        `}
      >
        <h2>Latest Post</h2>
        <article key={latestPost.fields.slug}>
          <PostCard
            date={latestPost.frontmatter.date}
            description={
              latestPost.fields.descriptionMd ||
              latestPost.frontmatter.description ||
              latestPost.excerpt
            }
            imageAlt={latestPost.fields.hero.alt}
            imageSrc={latestPost.fields.hero.src.publicURL}
            slug={latestPost.fields.slug}
            tags={latestPost.fields.tags}
            timeToRead={latestPost.timeToRead}
            title={latestPost.frontmatter.title}
          />
        </article>
      </section>
    </Layout>
  );
}

export default PortfolioIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
          fields {
            descriptionMd
            modifiedTime
            slug
            tags
            hero {
              src {
                publicURL
              }
              alt
              caption
            }
          }
        }
      }
    }
  }
`;
