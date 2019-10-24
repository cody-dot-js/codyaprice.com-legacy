import React from "react"

export default function RequireContextKeys() {
  const context = require.context("./")
  const keys = context.keys()
  const { id, resolve } = context

  return (
    <div
      style={{
        padding: 10,
        border: "3px dashed",
      }}
    >
      <h1>require.context object for this blog post</h1>
      <h2>Id:</h2>
      <p>{id}</p>
      <h2>Keys:</h2>
      <ul style={{ listStyle: "none" }}>
        {keys.map(key => (
          <li style={{ margin: 0, paddingBottom: 8 }} key={key}>
            <div>
              <strong>Key:&nbsp;</strong>
              {key}
            </div>
            <p>
              <strong>resolve(key):&nbsp;</strong>
              {resolve(key)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
