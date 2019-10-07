import React from 'react'

const Counter = ({ start }) => {
  const [count, setCount] = React.useState(Number(start) || 0)
  const handleIncrease = () => setCount(s => s + 1)

  return <button onClick={handleIncrease}>Count: {count}</button>
}

Counter.defaultHybridProps = {
  start: 0
}

export default Counter
