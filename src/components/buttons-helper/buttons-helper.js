import React, {Component} from 'react';
import './buttons-helper.css';

export default class ButtonsFilter extends Component{
    constructor(props) {
        super(props);
        this.buttons = [
            { name:'all', label: 'All'},
            { name:'active', label: 'Active'},
            { name:'done', label: 'Done'}
        ];
    }

    filterClicked = (event) => {
        this.props.filterTodo(event.target.value.toLowerCase())
    };


    render() {
        const {filter} = this.props;
        const buttons = this.buttons.map(({name, label}) => {
            const classButton = filter === name ? "btn btn-info active" : "btn btn-outline-secondary"
            return(
                <button
                    type="button"
                    value={name}
                    className={classButton}
                    key={name}>
                    {label}
                </button>
            )
        });
        return (
            <div
                className="btn-group"
                onClick={this.filterClicked}>
                {buttons}
            </div>
        );
    }
};