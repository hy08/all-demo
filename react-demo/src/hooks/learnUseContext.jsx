import { useContext, useState } from 'react';
import { ThemeContext, CountContext } from '../../context';
//深层级嵌套context怎么更改value，把更改函数也传递进去
function LearnUseContext() {
  const value = useContext(ThemeContext);
  const { count, changeCount } = useContext(CountContext);
  return (
    <div>
      <h1>learn useContext</h1>
      <p>context value: {value}</p>
      <ThemeContext.Consumer>
        {(value) => `ThemeContext.ConSumer value ${value}`}
      </ThemeContext.Consumer>
      <div>
        <p>CountContext value: {count}</p>
        <button
          onClick={() => {
            changeCount(count + 1);
          }}
        >
          内部组件改变CountContext的value
        </button>
      </div>
    </div>
  );
}
export function Parent() {
  const [theme, setTheme] = useState('dark');
  const [count, setCount] = useState(0);
  const changeCount = (value) => {
    setCount(value);
  };
  return (
    <ThemeContext.Provider value={theme}>
      <CountContext.Provider value={{ count, changeCount }}>
        <div>
          <button
            onClick={() => {
              setTheme('dark1');
            }}
          >
            改变ThemeContext值
          </button>
        </div>
        <LearnUseContext />
      </CountContext.Provider>
    </ThemeContext.Provider>
  );
}
