import React, { useState } from 'react';

let isMounted = false;
export default function HookDemo(props) {
  let name, setName, job, setJob;
  console.log(isMounted);
  if (!isMounted) {
    //eslint-disable-next-line
    [name, setName] = useState('hy');
    isMounted = true;
  }
  [job, setJob] = useState('软件开发');
  console.log('name:', name, ', job:', job);
  return (
    <div>
      {name && <div>姓名：{name}</div>}
      {job && <div>工作：{job}</div>}
      <button
        onClick={() => {
          console.log(name, setName);
          setName('tom');
        }}
      >
        修改姓名
      </button>
    </div>
  );
}
