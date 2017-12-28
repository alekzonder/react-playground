import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import TodoForm from './TodoForm';
import Db from './Db';

const db = new Db();

ReactModal.setAppElement('#root');

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // eslint-disable-next-line
            // increment: 0,

            todos: db.getTodos(),

            hasForm: true,
            showModal: false,
        };
    }

    componentDidMount() {
        this.addForm.focus();
    }

    onSubmit = (text) => {
        this.setState((prevState) => {
            const { todos } = prevState;

            const id = Db.generateTodoId();

            const todo = { id, text, done: false };

            db.addTodo(id, todo);

            todos[id] = todo;

            return {
                todos,
            };
        });

        this.addForm.clear();
        this.addForm.focus();
    };

    toggleForm = () => {
        this.setState(prevState => ({
            hasForm: !prevState.hasForm,
        }));
    };

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    handleTodoDone = (event) => {
        const todoId = event.target.dataset.id;

        this.setState((prevState) => {
            const { todos } = prevState;

            // TODO check todo by id
            todos[todoId].done = !todos[todoId].done;

            db.updateTodo(todoId, todos[todoId]);

            return {
                todos,
            };
        });
    };

    render() {
        const list = Object.keys(this.state.todos).reverse().map((todoId) => {
            const todo = this.state.todos[todoId];

            let rowClassName = 'row todo';

            if (todo.done) {
                rowClassName += ' todo_done';
            }

            return (
                <div className={rowClassName} key={todo.id}>
                    <div className="column column-10">
                        <input
                            data-id={todo.id}
                            className="todo__done-checkbox"
                            type="checkbox"
                            checked={todo.done}
                            onChange={this.handleTodoDone}
                        />
                    </div>
                    <div className="column column-90">{todo.text}</div>
                </div>
            );
        });

        let todoForm = null;

        if (this.state.hasForm) {
            todoForm = (<TodoForm
                ref={(form) => {
                    this.addForm = form;
                }}
                onSubmit={this.onSubmit}
            />);
        }

        return (
            <div>
                <h2>todos</h2>
                {/* <button onClick={this.handleOpenModal}>Trigger Modal</button> */}
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </ReactModal>
                {/* <button onClick={this.toggleForm}>toggle form</button> */}
                {todoForm}
                <div className="container">{list}</div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
