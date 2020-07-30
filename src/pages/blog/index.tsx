import React from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import { FaTags } from 'react-icons/fa';

import { Link, ListLayout, PostCard, SEO } from '../../components';

interface Props {
  data: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  location: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

function BlogPage({ data, location }: Props) {
  const posts = data.allMdx.edges;

  return (
    <ListLayout
      location={location}
      title="All Blog Posts"
      headerContent={
        <Link
          css={css`
            text-decoration: none;
            color: #fff;
            border-radius: 0.25rem;
            background: #574b90;
            padding: 0.5rem;
            transition: all 0.125s ease-in-out;
            &:hover, &:focus: {
              background: #a44fb6;
              box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38);
            }
            white-space: nowrap;
          `}
          to="/blog/tags"
        >
          View All Tags&nbsp;
          <FaTags
            css={css`
              vertical-align: middle;
            `}
          />
        </Link>
      }
    >
      <SEO title="All Blog Posts" />
      {posts.map(({ node }) => (
        <article key={node.fields.slug}>
          <PostCard
            date={node.frontmatter.date}
            description={
              node.fields.descriptionMd ||
              node.frontmatter.description ||
              node.excerpt
            }
            slug={node.fields.slug}
            tags={node.fields.tags}
            timeToRead={node.timeToRead}
            title={node.frontmatter.title}
          />
        </article>
      ))}
    </ListLayout>
  );
}

export default BlogPage;

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
