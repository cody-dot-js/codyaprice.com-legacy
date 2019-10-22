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
      style={{
        textAlign: "center",
        padding: 10,
        border: "3px dashed",
      }}
    >
      <h1>React Counter Component</h1>
      <h2>Count: {count}</h2>
      <button
        style={{ display: "block", width: "40%", margin: "auto" }}
        type="button"
        onClick={() => dispatch({ type: "increment" })}
      >
        +
      </button>
      <button
        style={{
          display: "block",
          width: "40%",
          margin: "auto",
          marginBottom: 15,
        }}
        type="button"
        onClick={() => dispatch({ type: "decrement" })}
      >
        -
      </button>
      <small>This is rendered inside markdown (using MDX!) 🤓</small>
    </div>
  )
}
