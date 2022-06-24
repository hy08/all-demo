import React from 'react';
import { useSafeState, useLatest, useGetState } from 'ahooks';

let isMounted = false;
export default function HookDemo(props) {
  const [count, setCount, getCount] = useGetState(0);
  const countRef = useLatest(count);
  return (
    <div>
      <div>count：{count}</div>
      <div>countRef.current：{countRef.current}</div>
      <button
        onClick={() => {
          countRef.current = count + 1;
          setCount(countRef.current);
          console.log('getCount', getCount(), 'countRef', countRef.current);
        }}
      >
        修改姓名
      </button>
    </div>
  );
}
