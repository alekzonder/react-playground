import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';

export default class AddForm extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChangeValue: PropTypes.func.isRequired,
  };

  onChangeValue = (event) => {
    this.props.onChangeValue(event.target.value);
  };

  render() {
    return <Textarea value={this.props.value} onChange={this.onChangeValue} />;
  }
}
