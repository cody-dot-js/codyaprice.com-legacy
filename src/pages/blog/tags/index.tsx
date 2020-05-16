import React from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import kebabCase from 'lodash.kebabcase';

import { ListLayout, Link, SearchField, SEO, Card } from '../../../components';
import caseInsensitiveContains from '../../../utils/caseInsensitiveContains';

interface Props {
  data: {
    allMdx: {
      group: Array<{
        fieldValue: string;
        totalCount: string | number;
      }>;
    };
  };
  location: any;
}

type Tag = {
  name: string;
  count: number | string;
  slug: string;
};

function TagsPage({ data, location }: Props) {
  const [query, setQuery] = React.useState<string>('');

  const handleSearch = React.useCallback(({ target: { value } }) => {
    setQuery(value);
  }, []);

  const handleClear = React.useCallback(() => setQuery(''), []);

  const tags = React.useMemo(
    () =>
      data.allMdx.group.reduce(
        (acc: Array<Tag>, { fieldValue, totalCount }) => {
          const slug: string = kebabCase(fieldValue.toLowerCase());

          acc.push({ name: fieldValue, count: totalCount, slug });

          return acc;
        },
        []
      ),
    [data.allMdx.group]
  );

  const filteredTags = React.useMemo(
    () => tags.filter(({ name }) => caseInsensitiveContains(name, query)),
    [query, tags]
  );

  const groupLookup = React.useMemo(
    () =>
      filteredTags.reduce((acc: Record<string, Tag[]>, tag) => {
        const group = tag.name.slice(0, 1).toUpperCase();

        if (acc[group] == null) {
          acc[group] = [];
        }
        acc[group].push(tag);

        return acc;
      }, {}),
    [filteredTags]
  );

  const groups = Object.keys(groupLookup).sort();

  return (
    <ListLayout location={location} title={`Tags (${tags.length})`}>
      <SEO title="All tags" />
      <SearchField
        css={css`
          pointer-events: auto;
        `}
        title="Filter tags"
        placeholder="Search tags"
        value={query}
        onChange={handleSearch}
        onClear={handleClear}
      />
      <Card
        css={css`
          position: relative;
          overflow-y: scroll;
          height: 50rem;
          background-color: #fff;
          pointer-events: auto;
        `}
      >
        {groups.length > 0 ? (
          <ul
            css={css`
              list-style: none;
              padding: 0;
              margin: 0;
              display: block;
            `}
          >
            {groups.map((group) => (
              <li key={group}>
                <h3>{group}</h3>
                <ul
                  css={css`
                    display: flex;
                    flex-flow: row wrap;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                  `}
                >
                  {groupLookup[group].map(({ name, count, slug }) => (
                    <li
                      css={css`
                        padding: 1rem;
                        margin: 0;
                      `}
                      key={name + count + slug}
                    >
                      <Link
                        to={`/blog/tags/${slug}`}
                        css={css`
                          text-decoration: none;
                          border-radius: 0.25rem;
                          padding: 0.5rem;
                          transition: all 0.125s ease-in-out;
                          &:hover, &:focus: {
                            background: #a44fb6;
                            color: #fff;
                            box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.38);
                          }
                          white-space: nowrap;
                        `}
                      >
                        {name}&nbsp;({count})
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.5rem;
            `}
          >
            No tags found for&nbsp;<strong>"{query}"</strong>&nbsp;🕵️‍♂️
          </div>
        )}
      </Card>
    </ListLayout>
  );
}

export default TagsPage;

export const pageQuery = graphql`
  query {
    allMdx {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
