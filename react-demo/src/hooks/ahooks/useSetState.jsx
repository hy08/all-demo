import { useSetState } from 'ahooks';

export default function TestUseSetState() {
  const [state, setState] = useSetState({ count: 1 });
  const [state1, setState1] = useSetState({ count: 2 });
  return (
    <div>
      <div>
        <p>{state.count}</p>
        <button
          onClick={() => {
            setState((prevState) => ({
              ...prevState,
              count: prevState.count + 1,
            }));
          }}
        >
          新增
        </button>
      </div>
      <div>
        <p>{state1.count}</p>
        <button
          onClick={() => {
            setState1((prevState) => ({
              ...prevState,
              count: prevState.count + 1,
            }));
          }}
        >
          新增
        </button>
      </div>
    </div>
  );
}
