import React from 'react';
import PropTypes from 'prop-types';

export default class Form extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChangeName: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      selected: 'two',
      selectOptions: [
        {
          value: 'one',
          title: 'one',
        },
        {
          value: 'two',
          title: 'two',
        },
        {
          value: 'three',
          title: 'three',
        },
      ],
    };
  }

  onChangeName = (event) => {
    this.props.onChangeName(event.target.value);
  };

  onChangeText = (event) => {
    this.setState({ text: event.target.value });
  };

  onChangeSelected = (event) => {
    this.setState({ selected: event.target.value });
  };

  changeName = (event) => {
    event.preventDefault();
    this.props.onChangeName('alekzonder');
  };

  render() {
    return (
      <form>
        <h4>{this.props.name}</h4>

        <input type="text" value={this.props.name.toUpperCase()} onChange={this.onChangeName} />

        <br />

        <button onClick={this.changeName}>change name</button>

        <br />

        <textarea value={this.state.text} onChange={this.onChangeText} />

        <br />

        <code>
          <pre>{this.state.text}</pre>
        </code>

        <h4>selected = {this.state.selected}</h4>

        <select value={this.state.selected} onChange={this.onChangeSelected}>
          {this.state.selectOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
      </form>
    );
  }
}
