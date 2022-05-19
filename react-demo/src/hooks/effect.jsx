import { useState, useEffect } from './node_modules/react';

/**
 * useEffect的clean函数执行时机：
 * 组件每次render（自身导致的更新或者父组件导致的更新）
 * 组件卸载
 * 总结：也就是每次执行effect的时候会先执行clean effect（如果有的话），卸载的时候会最后执行clean effect
 */
export const LearnUseEffect = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('执行child useEffect', count);
    return () => {
      console.log('执行child useEffect clean', count);
    };
  });
  const add = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <button onClick={add}>child +</button>
      <p>child count:{count}</p>
    </div>
  );
};
export function WrapCom() {
  const [count, setCount] = useState(0);

  const show = () => {
    console.log('count', count);
  };
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Parent+</button>
      <button onClick={show}>show</button>
      <p>Parent count:{count}</p>
      {/* <LearnUseEffect /> */}
    </div>
  );
}
//测试useEffect初始化执行和依赖发生改变执行
export const UseEffectDemo = () => {
  const [count, setCount] = useState(0);
  const doSomething = () => {};
  useEffect(() => {
    const newCount = count + 1;
    setCount(count + 1);
  }, [count]);
  return <div>{count}</div>;
};
