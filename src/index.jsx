import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';

// import Clock from './Clock';
// import Toggle from './Toggle';
// import List from './List';
import Form from './Form';

// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }
//
// Welcome.propTypes = {
//   name: PropTypes.string.isRequired,
// };

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'test',
    };
  }

  onChangeName = (value) => {
    this.setState({
      name: value,
    });
  };

  render() {
    return (
      <div>
        <h4>name is {this.state.name}</h4>
        <Form name={this.state.name} onChangeName={this.onChangeName} />
      </div>
    );
  }
}

// {/* <Welcome name="A" />
// <Clock />
// <Toggle />
// <ul>{numbers}</ul>
// <List /> */}
// function App() {
//   // const numbers = [1, 2, 3, 4].map(number => <li key={number.toString()}>{number}</li>);
// }

ReactDOM.render(<App />, document.getElementById('root'));
