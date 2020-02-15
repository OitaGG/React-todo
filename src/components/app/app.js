import React, {Component} from "react";

import AppHeadder from "../app-header/app-header";
import ButtonsFilter from "../buttons-helper/buttons-helper";
import SearchPanel from "../search-panel/search-panel";
import TodoList from "../todo-list/todo-list";
import AddItemForm from "../add-item-form/add-item-form";

import './app.css';

const uuidv1 = require('uuid/v1');

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                this.createTodoItem('Lunch'),
                this.createTodoItem('Lunch Again'),
                this.createTodoItem('Dinner'),
            ],
            labelForSearch: '',
            filter: 'all' //all, active, done
        };
    }

    createTodoItem = (label) => {
        return {
            label,
            important: false,
            done: false,
            id:uuidv1()
        }
    };

    onDeletedTodoItem = (id) => {
        this.setState(({todos}) => {
            const indexOfDeletedItem = todos.findIndex((element) => element.id === id);
            const newData = [...todos];
            newData.splice(indexOfDeletedItem, 1);
            return {
                todos: newData
            }
        });
        this.render()
    };

    onAddTodoItem = (label) => {
        this.setState(({todos}) => {
            const newData = [...todos];
            newData.push(this.createTodoItem(label));
            return {
                todos: newData
            }
        });
        this.render();
    };
    onToggleProperty = (arr, id, prop) => {
        const index = arr.findIndex((element) => element.id === id);
        const oldItem = {...arr[index]};
        const newItem = {...oldItem, [prop]: !oldItem[prop]};
        const newData = [...arr];
        newData.splice(index,1,newItem);
        return {
            todos: newData,
        }
    };

    onToggleDone = (id) => {
        this.setState(({todos}) => {
            return this.onToggleProperty(todos,id,"done");
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todos}) => {
            return this.onToggleProperty(todos,id,"important");
        });
    };

    search = (data, label) => {
        const newData = data.filter((elem) => elem
                                                .label
                                                .toLowerCase()
                                                .includes(label.toLowerCase()));
        return newData;
    };

    changeSerchLabelState = (label) => {
        this.setState({
            labelForSearch: label
        })
    };

    changeFilterState = (label) => {
        this.setState({
            filter: label
        })
    };

    filter = (data, filter) => {
        switch (filter) {
            case 'all':
                return data;
            case 'active':
                return data.filter((elem) => !elem.done);
            case 'done':
                return data.filter((elem) => elem.done);
            default:
                return data;
        }
    };
    render() {
        const {todos:todoData, labelForSearch, filter} = this.state;
        const visibleItems = this.filter(this.search(todoData, labelForSearch), filter);

        const doneCount = todoData
                                    .filter((elem) => elem.done === true)
                                    .length;
        const inProcessCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeadder todo={inProcessCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                                onSearch={this.changeSerchLabelState}/>
                    <ButtonsFilter
                        filterTodo={this.changeFilterState}
                        filter={filter}/>
                </div>
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.onDeletedTodoItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <AddItemForm onAddItem={this.onAddTodoItem}/>
            </div>
        )
    }
};