import React from "react"

function useToggle(defaultState = false): [boolean, () => void] {
  const [value, setToggle] = React.useState<boolean>(defaultState)

  const toggle = React.useCallback(() => {
    setToggle((v) => !v)
  }, [])

  return [value, toggle]
}

export default useToggle
