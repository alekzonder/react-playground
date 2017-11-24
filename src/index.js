import React from 'react';
import ReactDOM from 'react-dom';

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

function FormattedDate(props) {
  return <span>{props.date.toLocaleTimeString()}</span>;
}



class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    componentWillUnMount() {
        clearInterval(this.interval);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return <h2>Clock: <FormattedDate date={this.state.date} /></h2>;
    }
}


class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    console.log(this);
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

function App() {
  return (
    <div>
      <Welcome name="A"/>
      <Clock />
      <Toggle />
    </div>
  );
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
