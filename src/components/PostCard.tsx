import React, { ReactNode } from 'react';
import Card from './Card';
import Tags from './Tags';
import Link from './Link';
import formatReadingTime from '../utils/formatReadingTime';
import { mediaQueries } from './breakpoints';
import { css } from '@emotion/core';

interface Props {
  imageSrc?: string;
  imageAlt?: string;
  title: ReactNode;
  description?: string;
  tags?: Array<string>;
  slug: string;
  date: string;
  timeToRead: number;
}

function PostCard({
  imageSrc,
  imageAlt,
  title,
  description = '',
  tags = [],
  slug,
  date,
  timeToRead,
}: Props) {
  return (
    <Card
      css={css`
        background-color: #fff;
        display: block;

        ${mediaQueries.desktop} {
          display: grid;
          grid-column-gap: 1rem;
          ${imageSrc ? 'grid-template-columns: 50% 1fr' : undefined};
        }
      `}
    >
      {imageSrc && (
        <Link to={slug}>
          <img
            css={css`
              margin-bottom: 1rem;
              width: 100%;
              max-height: 20rem;
              max-width: 20rem;
              top: 0;
              object-fit: contain;

              ${mediaQueries.desktop} {
                margin-bottom: 0;
              }
            `}
            alt={imageAlt}
            src={imageSrc}
            loading="lazy"
          />
        </Link>
      )}
      <div
        css={css`
          display: flex;
          height: 100%;
          flex-direction: column;
        `}
      >
        <header>
          <h2
            css={css`
              margin-bottom: 0.5rem;
            `}
          >
            <Link to={slug}>{title}</Link>
          </h2>
          <small
            css={css`
              display: block;
            `}
          >
            {date}
            {` • ${formatReadingTime(timeToRead)}`}
          </small>
        </header>
        {description && (
          <div
            css={css`
              flex: 1;
            `}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
        <Tags list={tags} />
        <Link
          css={css`
            align-self: flex-end;
          `}
          to={slug}
        >
          Read →
        </Link>
      </div>
    </Card>
  );
}

export default PostCard;
