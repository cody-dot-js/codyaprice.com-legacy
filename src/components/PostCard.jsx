import React from "react"
import PropTypes from "prop-types"
import Image from "gatsby-image"
import Card from "./Card"
import Tags from "./Tags"
import Link from "./Link"
import formatReadingTime from "../utils/formatReadingTime"
import { mediaQueries } from "./breakpoints"
import { css } from "@emotion/core"

const propTypes = {
  imageSrc: PropTypes.object.isRequired,
  imageAlt: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  tags: PropTypes.arrayOf(PropTypes.string),
  slug: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
}

const defaultProps = {
  description: null,
  tags: [],
}

function PostCard({
  imageSrc,
  imageAlt,
  title,
  description,
  tags,
  slug,
  date,
  timeToRead,
}) {
  return (
    <Card
      css={css`
        background-color: #fff;
        display: block;
        pointer-events: auto;

        ${mediaQueries.desktop} {
          display: grid;
          grid-column-gap: 1rem;
          grid-template-columns: 50% 1fr;
        }
      `}
    >
      <Link to={slug}>
        <Image
          css={css`
            margin-bottom: 1rem;
            max-height: 20rem;

            ${mediaQueries.desktop} {
              margin-bottom: 0;
            }
          `}
          alt={imageAlt}
          fluid={imageSrc}
        />
      </Link>
      <div
        css={css`
          display: flex;
          height: 100%;
          flex-direction: column;
        `}
      >
        <header>
          <h2
            css={{
              marginBottom: "0.5rem",
            }}
          >
            <Link to={slug}>{title}</Link>
          </h2>
          <small css={{ display: "block" }}>
            {date}
            {` • ${formatReadingTime(timeToRead)}`}
          </small>
        </header>
        <div
          css={css`
            flex: 1;
          `}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
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
  )
}

PostCard.propTypes = propTypes
PostCard.defaultProps = defaultProps

export default PostCard
