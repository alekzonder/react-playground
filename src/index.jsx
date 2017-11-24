import React from 'react';
import ReactDOM from 'react-dom';

import Clock from './Clock';
import Toggle from './Toggle';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

Welcome.propTypes = {
  name: React.PropTypes.string.isRequired,
};

function App() {
  const numbers = [1, 2, 3, 4].map(number => <li key={number.toString()}>{number}</li>);

  return (
    <div>
      <Welcome name="A" />
      <Clock />
      <Toggle />
      <ul>{numbers}</ul>
    </div>);
}


ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
