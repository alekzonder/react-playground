import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import TodoForm from './TodoForm';
import TodoListItem from './TodoListItem';
import Db from './Db';

const db = new Db();

ReactModal.setAppElement('#root');

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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

    handleTodoDone = (todoId) => {
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

    handleTodoSave = (todoId, text) => {
        this.setState((prevState) => {
            const { todos } = prevState;

            // TODO check todo by id
            todos[todoId].text = text;

            db.updateTodo(todoId, todos[todoId]);

            return {
                todos,
            };
        });
    };

    render() {
        const list = Object.keys(this.state.todos).reverse().map((todoId) => {
            const todo = this.state.todos[todoId];

            return (
                <TodoListItem
                    key={todo.id}
                    todo={todo}
                    onDone={this.handleTodoDone}
                    onSave={this.handleTodoSave}
                />
            );
        });

        let todoForm = null;

        if (this.state.hasForm) {
            todoForm = (
                <TodoForm
                    ref={(form) => {
                        this.addForm = form;
                    }}
                    onSubmit={this.onSubmit}
                />
            );
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
