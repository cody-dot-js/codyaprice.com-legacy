import React from "react"

function ListLengthExample() {
  const [list, setList] = React.useState([])

  function addItem() {
    setList(list.concat(list.length + 1))
  }

  function clearList() {
    setList([])
  }

  return (
    <div css={{ margin: "0 auto", textAlign: "center" }}>
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
          css={{ maxHeight: "200px", overflowY: "scroll", listStyle: "inside" }}
        >
          {list.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListLengthExample
