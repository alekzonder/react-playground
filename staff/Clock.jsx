import React from 'react';
import PropTypes from 'prop-types';

function FormattedDate(props) {
  return <span>{props.date.toLocaleTimeString()}</span>;
}
FormattedDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default class Clock extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      shown: true,
      date: new Date(),
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    console.log('componentWillUnMount');
    clearInterval(this.interval);
  }

  tick() {
    this.setState({
      // shown: !this.state.shown,
      date: new Date(),
    });
  }

  render() {
    if (!this.state.shown) {
      return null;
    }

    return <h2>Clock: <FormattedDate date={this.state.date} /></h2>;
  }
}
