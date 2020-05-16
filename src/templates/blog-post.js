import React from 'react';
import { css } from '@emotion/core';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import {
  Commento,
  PostLayout,
  ReadingProgress,
  SEO,
  Tags,
} from '../components';
import { rhythm } from '../utils/typography';
import formatReadingTime from '../utils/formatReadingTime';

function BlogPost({ data, location, pageContext }) {
  const { mdx: post } = data;
  const { previous, next } = pageContext;
  const postRef = React.useRef(null);
  const layoutRef = React.useRef(null);

  return (
    <>
      <ReadingProgress targetRef={postRef} />
      <PostLayout
        layoutRef={layoutRef}
        location={location}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
      >
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <p
              css={css`
                margin-bottom: 0;
              `}
            >
              {post.frontmatter.date}
            </p>
            <p
              css={css`
                margin-bottom: 0;
              `}
            >
              {formatReadingTime(post.timeToRead)}
            </p>
            <Tags list={post.fields.tags} />
          </header>
          <div ref={postRef}>
            <Image
              css={css`
                margin-bottom: 2rem;
              `}
              alt={post.fields.hero.alt}
              fluid={post.fields.hero.src.childImageSharp.fluid}
            />
            <figcaption
              dangerouslySetInnerHTML={{
                __html: post.fields.hero.caption,
              }}
            />
            <div
              css={css`
                margin: 0 auto;
                max-width: 50rem;
              `}
            >
              <MDXRenderer>{post.body}</MDXRenderer>
            </div>
          </div>
          <hr
            css={css`
              margin-bottom: ${rhythm(1)};
            `}
          />
        </article>
        <nav>
          <ul
            css={css`
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              list-style: none;
              padding: 0;
            `}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <Commento id={post.fields.slug} />
      </PostLayout>
    </>
  );
}

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      timeToRead
      fields {
        modifiedTime
        slug
        tags
        hero {
          src {
            ...heroImage800
          }
          alt
          caption
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`;
