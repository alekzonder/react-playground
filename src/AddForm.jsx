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

        // TODO register, destroy listeners
        // this._keyListeners = {
        //     enter: null,
        //     ctrlEnter: null,
        //     cmdEnter: null,
        // };

        this.textarea = null;
    }

   onChangeValue = (event) => {
       this.setState({ value: event.target.value });
   };

   onInputRef = (ref) => {
       this.textarea = ref;
       this._initKeypress();
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

   _initKeypress() {
       const listener = new Keypress.Listener(this._textarea);

       listener.register_combo({
           keys: 'enter',
           on_keydown: () => {
               if (this.state.multiline) {
                   return true;
               }

               this.submit();

               return false;
           },
       });

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
