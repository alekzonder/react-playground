import React from 'react';
import ReactDOM from 'react-dom';

import AddForm from './AddForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line
      increment: 0,
      todos: [],
    };
  }

  componentDidMount() {
    this.addForm.focus();
  }

  onSubmit = (text) => {
    this.setState((prevState) => {
      const { increment } = prevState;
      const { todos } = prevState;
      todos.unshift({ id: increment, text });

      return {
        todos,
        increment: increment + 1,
      };
    });

    this.addForm.clear();
    this.addForm.focus();
  };

  render() {
    const list = this.state.todos.map(todo => <li key={todo.id}>{todo.text}</li>);

    return (
      <div>
        <AddForm
          ref={(form) => {
            this.addForm = form;
          }}
          onSubmit={this.onSubmit}
        />

        <ul>{list}</ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
