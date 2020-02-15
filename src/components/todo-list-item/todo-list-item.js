import React from 'react';
import './todo-list-item.css';

const TodoListItem = ({label, onDeleted, onToggleImportant, onToggleDone, done, important}) => {
        let classNameForItem = done ? "todo-list-item-label done" : "todo-list-item-label";
        if(important){
            classNameForItem += " important"
        }
        return (
            <div className="todo-list-item d-flex">
            <span className={classNameForItem}
                    onClick={onToggleDone}>
                {label}
            </span>

                <button type="button"
                        className="btn btn-outline-success"
                        onClick={onToggleImportant}>
                    <i className="fa fa-exclamation" />
                </button>

                <button type="button"
                        className="btn btn-outline-danger"
                        onClick={onDeleted}>
                    <i className="fa fa-trash-o" />
                </button>
            </div>
        )
};

export default TodoListItem;