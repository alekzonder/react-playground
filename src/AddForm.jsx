import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import Keypress from 'keypress.js/keypress-2.1.4.min';

/**
 * - по умолчанию должен быть режим который делает submit по enter
 *  пока отправка всегда по cmd enter, ctrl enter
 * - по shift + enter активируется многострочный режим
 * и в нем отправка тоже по shift+enter или cmd+enter или ctrl+enter
 * -
 */
export default class AddForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      value: '',
      disabled: false,
    };
  }

  onChangeValue = (event) => {
    this.setState({ value: event.target.value });
  };

  onInputRef = (ref) => {
    this.textarea = ref;
  };

  onKeypress = (event) => {
    const el = event.target;

    const listener = new Keypress.Listener(el);

    // TODO remove listeners on destroy
    listener.register_combo({
      keys: 'ctrl enter',
      on_keyup: () => {
        this.submit();
      },
    });

    listener.register_combo({
      keys: 'cmd enter',
      on_keyup: () => {
        this.submit();
      },
    });
  };

  clear = () => {
    this.setState({ disabled: false, value: '' });
  };

  focus = () => {
    this.textarea.focus();
  };

  submit = () => {
    if (!this.state.value) {
      // TODO error empty
      return;
    }

    this.setState({ disabled: true });
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <Textarea
        inputRef={this.onInputRef}
        className="todo-add-form"
        placeholder="type todos here ..."
        value={this.state.value}
        onChange={this.onChangeValue}
        onKeyPress={this.onKeypress}
        disabled={this.state.disabled}
      />
    );
  }
}
