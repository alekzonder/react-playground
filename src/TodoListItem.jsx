import React from 'react';
import PropTypes from 'prop-types';

import TodoForm from './TodoForm';

export default class TodoListItem extends React.Component {
    static propTypes = {
        // TODO object format
        todo: PropTypes.object.isRequired,
        onDone: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
        };
    }

    setEditMode() {
        this.setState({
            edit: true,
        });
    }

    setViewMode() {
        this.setState({
            edit: false,
        });
    }

    handleDoubleClick = () => {
        this.setState({
            edit: true,
        });
    };

    handleCancel = () => {
        this.setState({
            edit: false,
        });
    };

    handleTodoDone = () => {
        this.props.onDone(this.props.todo.id);
    };

    handleSave = (text) => {
        this.props.onSave(this.props.todo.id, text);
        this.setViewMode();
    };

    render() {
        const { todo } = this.props;

        const rowClassName = ['row', 'todo'];

        if (todo.done) {
            rowClassName.push('todo_done');
        }

        let content;

        if (this.state.edit) {
            rowClassName.push('todo_edit');
            rowClassName.push('overlay-around');

            const options = {
                autoFocus: true,
                showButtons: true,
                multiline: true,
            };

            content = (
                <div className={rowClassName.join(' ')}>
                    <div className="column">
                        <TodoForm
                            options={options}
                            value={todo.text}
                            onCancel={this.handleCancel}
                            onSubmit={this.handleSave}
                        />
                    </div>
                </div>
            );
        } else {
            rowClassName.push('todo_view');
            content = (
                <div className={rowClassName.join(' ')}>
                    <div className="column column-10">
                        <input
                            data-id={todo.id}
                            className="todo__done-checkbox"
                            type="checkbox"
                            checked={todo.done}
                            onChange={this.handleTodoDone}
                        />
                    </div>
                    <div className="column column-90 todo__text" onDoubleClick={this.handleDoubleClick}>{todo.text}</div>
                </div>
            );
        }

        return content;
    }
}
