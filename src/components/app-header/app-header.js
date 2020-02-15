import React from 'react';
import './app-header.css';
const AppHeadder = ({todo, done}) => {
    return (
        <div className="app-header d-flex">
            <h1>React-todo</h1>
            <h2 className="text-muted">{todo} more to do, {done} done</h2>
        </div>
    )
};

export default AppHeadder;