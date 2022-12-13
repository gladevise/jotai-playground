import { atom, useAtom } from 'jotai';
import { countAtom } from './atom';

import React from 'react';

const addingCountAtom = atom(
  (get) => get(countAtom),
  (get, set, num: number) => {
    set(countAtom, get(countAtom) + num);
  }
);

const Counter = () => {
  const [count, add] = useAtom(addingCountAtom);
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => add(Math.random())}>Add random number</button>
    </div>
  );
};

const doubledCountAtom = atom((get) => get(countAtom) * 2);

export const DoubleCounter = () => {
  const [doubledCount] = useAtom(doubledCountAtom);
  return <div>{doubledCount}</div>;
};

export default Counter;
