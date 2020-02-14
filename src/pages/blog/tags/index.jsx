import React from "react"
import { graphql } from "gatsby"
import kebabCase from "lodash.kebabcase"

import { ListLayout, Link, SearchField, SEO, Card } from "../../../components"
import caseInsensitiveContains from "../../../utils/caseInsensitiveContains"

function TagsPage({ data, location }) {
  const [query, setQuery] = React.useState("")

  const handleSearch = React.useCallback(({ target: { value } }) => {
    setQuery(value)
  }, [])

  const handleClear = React.useCallback(() => setQuery(""), [])

  const tags = React.useMemo(
    () =>
      data.allMdx.group.reduce((acc, tag) => {
        const slug = kebabCase(tag.fieldValue.toLowerCase())

        acc.push({ name: tag.fieldValue, count: tag.totalCount, slug })

        return acc
      }, []),
    [data.allMdx.group]
  )

  const filteredTags = React.useMemo(
    () => tags.filter(({ name }) => caseInsensitiveContains(name, query)),
    [query, tags]
  )

  const groupLookup = React.useMemo(
    () =>
      filteredTags.reduce((acc, tag) => {
        const group = tag.name.slice(0, 1).toUpperCase()

        if (acc[group] == null) {
          acc[group] = []
        }
        acc[group].push(tag)

        return acc
      }, {}),
    [filteredTags]
  )

  const groups = Object.keys(groupLookup).sort()

  return (
    <ListLayout location={location} title={`Tags (${tags.length})`}>
      <SEO title="All tags" />
      <SearchField
        css={{ pointerEvents: "auto" }}
        title="Filter tags"
        placeholder="Search tags"
        value={query}
        onChange={handleSearch}
        onClear={handleClear}
      />
      <Card
        css={{
          position: "relative",
          overflowY: "scroll",
          height: "50rem",
          backgroundColor: "#fff",
          pointerEvents: "auto"
        }}
      >
        {groups.length > 0 ? (
          <ul
            css={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "block"
            }}
          >
            {groups.map(group => (
              <li key={group}>
                <h3>{group}</h3>
                <ul
                  css={{
                    display: "flex",
                    flexFlow: "row wrap",
                    listStyle: "none",
                    padding: 0,
                    margin: 0
                  }}
                >
                  {groupLookup[group].map(({ name, count, slug }) => (
                    <li
                      css={{ padding: "1rem", margin: 0 }}
                      key={name + count + slug}
                    >
                      <Link
                        to={`/blog/tags/${slug}`}
                        css={{
                          textDecoration: "none",
                          borderRadius: "0.25rem",
                          padding: "0.5rem",
                          "&:hover,&:focus": {
                            background: "#a44fb6",
                            color: "#fff"
                          },
                          whiteSpace: "nowrap"
                        }}
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
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem"
            }}
          >
            No tags found for&nbsp;<strong>"{query}"</strong>&nbsp;🕵️‍♂️
          </div>
        )}
      </Card>
    </ListLayout>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query {
    allMdx {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
