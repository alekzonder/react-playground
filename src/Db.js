import lowdb from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import nanoid from 'nanoid';


export default class Db {
    constructor() {
        this._adapter = new LocalStorage('todo_db');
        this._db = lowdb(this._adapter);

        this._init();
    }

    static generateTodoId() {
        return nanoid();
    }

    getTodos() {
        return this._readTodos();
    }

    addTodo(id, todo) {
        const todos = this._readTodos();
        todos[id] = todo;
        this._writeTodos(todos);
    }

    updateTodo(id, todo) {
        const todos = this._readTodos();
        todos[id] = todo;
        this._writeTodos(todos);
    }

    _init() {
        if (!this._readTodos()) {
            this._writeTodos({
                0: { id: '0', text: 'here is your first todo', done: false },
            });
        }
    }

    _readTodos() {
        return this._db.get('todos').value();
    }

    _writeTodos(todos) {
        return this._db.set('todos', todos).write();
    }
}
