import React from "react"
import { css } from "@emotion/core"

const initialState = { count: 0 }

enum CounterAction {
  increment = "increment",
  decrement = "decrement",
}

interface IReducerState {
  count: number
}

interface IReducerAction {
  type: CounterAction
}

function reducer({ count }: IReducerState, { type }: IReducerAction) {
  switch (type) {
    case CounterAction.increment:
      return { count: count + 1 }
    case CounterAction.decrement:
      return { count: count - 1 }
    default:
      throw new Error()
  }
}

export default function Counter() {
  const [{ count }, dispatch] = React.useReducer(reducer, initialState)

  return (
    <div
      css={css`
        text-align: center;
        padding: 0.5rem;
        border: 0.25rem dashed;
      `}
    >
      <h1>React Counter Component</h1>
      <h2>Count: {count}</h2>
      <button
        css={css`
          display: block;
          width: 40%;
          margin: auto;
        `}
        type="button"
        onClick={() => dispatch({ type: CounterAction.increment })}
      >
        +
      </button>
      <button
        css={css`
          display: block;
          width: 40%;
          margin: auto;
          margin-bottom: 1rem;
        `}
        type="button"
        onClick={() => dispatch({ type: CounterAction.decrement })}
      >
        -
      </button>
      <small>This is rendered inside markdown (using MDX!) 🤓</small>
    </div>
  )
}
