import LifeCycle from './components/LifeCycle';
import './App.css';

function App() {
  const vdom = (
    <div className="App">
      <LifeCycle />
    </div>
  );
  console.log(vdom);
  return vdom;
}

export default App;
