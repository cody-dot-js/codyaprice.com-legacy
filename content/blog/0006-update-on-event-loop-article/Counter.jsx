import React from "react"

const initialState = { count: 0 }

function reducer({ count }, { type }) {
  switch (type) {
    case "increment":
      return { count: count + 1 }
    case "decrement":
      return { count: count - 1 }
    default:
      throw new Error()
  }
}

export default function Counter() {
  const [{ count }, dispatch] = React.useReducer(reducer, initialState)

  return (
    <div
      css={{
        textAlign: "center",
        padding: "0.5rem",
        border: "0.25rem dashed",
      }}
    >
      <h1>React Counter Component</h1>
      <h2>Count: {count}</h2>
      <button
        css={{ display: "block", width: "40%", margin: "auto" }}
        type="button"
        onClick={() => dispatch({ type: "increment" })}
      >
        +
      </button>
      <button
        css={{
          display: "block",
          width: "40%",
          margin: "auto",
          marginBottom: "1rem",
        }}
        type="button"
        onClick={() => dispatch({ type: "decrement" })}
      >
        -
      </button>
      <small>
        This is rendered inside markdown (using MDX!){" "}
        <span role="img" aria-label="nerdy face emoji">
          🤓
        </span>
      </small>
    </div>
  )
}
