import createPersistedState from "use-persisted-state"

function useCounter(key, initialCount = 0) {
  const usePersistedCount = createPersistedState(`cap:${key}`)
  const [count, setCount] = usePersistedCount(initialCount)

  return {
    count,
    increment: () => setCount(currentCount => currentCount + 1),
    decrement: () => setCount(currentCount => currentCount - 1)
  }
}

export default useCounter
