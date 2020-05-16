import React from "react"
import { css } from "@emotion/core"

function ListLengthExample() {
  const [list, setList] = React.useState<Array<number>>([])

  function addItem() {
    setList((l) => l.concat(l.length + 1))
  }

  function clearList() {
    setList([])
  }

  return (
    <div
      css={css`
        margin: 0 auto;
        text-align: center;
      `}
    >
      <p>List length: {list.length}</p>
      <div>
        <button type="button" onClick={addItem}>
          Add One
        </button>
        <button type="button" onClick={clearList}>
          Clear List
        </button>
      </div>
      {list.length && (
        <ul
          css={css`
            max-height: 200px;
            overflow-y: scroll;
            list-style: inside;
          `}
        >
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListLengthExample
