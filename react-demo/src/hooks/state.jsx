import { useState, useEffect } from 'react';

export const LearnUseState = () => {
  const [data, setData] = useState(0);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(0);

  const add = () => {
    console.log(count);
    setCount(count + 1);
    setResult(count + 1);
  };
  const change = () => {
    setData(data + 1);
  };
  useEffect(() => {
    setCount(count + 1);
    add();
  }, [data]);
  return (
    <div>
      <button onClick={change}>改变依赖项数据</button>
      <p>result:{result}</p>
    </div>
  );
};
