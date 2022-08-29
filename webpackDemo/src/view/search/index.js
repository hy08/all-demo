import React from 'react';
import ReactDOM from 'react-dom';
import LogoImg from '../../assets/images/logo192.png';
import './index.less';
const Search = () => {
  return (
    <div className="search">
      search4
      <img src={LogoImg} alt="logo" />
    </div>
  );
};
ReactDOM.render(<Search />, document.getElementById('root'));
