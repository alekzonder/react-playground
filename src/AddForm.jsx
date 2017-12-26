import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import Keypress from 'keypress.js/keypress-2.1.4.min';

export default class AddForm extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    constructor() {
        super();

        this.state = {
            value: '',
            disabled: false,
            multiline: false,
        };

        this.textarea = null;

        this._keyListener = null;
    }

    componentWillMount() {
        this._initKeypress();
    }

    componentWillUnmount() {
        if (this._keyListener) {
            this._keyListener.destroy();
        }
    }

    onChangeValue = (event) => {
        this.setState({ value: event.target.value });
    };

    onInputRef = (ref) => {
        this.textarea = ref;
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

        this.setState({ disabled: true, multiline: false });
        this.props.onSubmit(this.state.value);
    };

    _initKeypress() {
        this._keyListener = new Keypress.Listener(this._textarea);

        this._keyListener.register_combo({
            keys: 'enter',
            on_keydown: () => {
                if (this.state.multiline) {
                    return true;
                }

                this.submit();

                return false;
            },
        });

        this._keyListener.register_combo({
            keys: 'shift enter',
            on_keydown: () => {
                if (this.state.multiline === false) {
                    this.setState(prevState => ({
                        multiline: true,
                        value: `${prevState.value}\n`,
                    }));
                }

                return false;
            },
        });

        this._keyListener.register_combo({
            keys: 'cmd enter',
            on_keyup: () => {
                this.submit();
            },
        });
    }

    render() {
        const style = {};

        if (!this.state.multiline) {
            style.resize = 'none';
        }

        return (
            <Textarea
                inputRef={this.onInputRef}
                className="todo-add-form"
                placeholder="type todos here ..."
                style={style}
                value={this.state.value}
                onChange={this.onChangeValue}
                disabled={this.state.disabled}
            />
        );
    }
}
