"use client";

import { useState } from "react";

export default function Counter({ users }) {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <p>total users : {users.length}</p>

      <button onClick={() => setCounter((c) => c + 1)}>{counter}</button>
    </div>
  );
}
