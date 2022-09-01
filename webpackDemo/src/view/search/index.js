import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import LogoImg from '../../assets/images/logo192.png';
import './index.less';

function Search() {
  const [component, setComponent] = useState(null);
  const loadCompontent = () => {
    import('./text').then((Text) => {
      setComponent(Text.default);
    });
  };
  return (
    <div className="search">
      search4
      <img src={LogoImg} alt="logo" onClick={loadCompontent} />
      <div>{component}</div>
    </div>
  );
}
ReactDOM.render(<Search />, document.getElementById('root'));
