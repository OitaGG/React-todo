import React, {Component} from "react";
import './add-item-form.css'
export default class AddItemForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            label: ''
        };
    };

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value
        })
    };

    onSubmit = (event) => {
        event.preventDefault();
        if(this.state.label) {
            this.props.onAddItem(this.state.label);
            this.setState({
                label: ''
            });
        }
    };

    render() {
        return (
            <form
                className="add-item d-flex"
                onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control add-item-input"
                       onChange={this.onLabelChange}
                       value={this.state.label}
                       placeholder="What needs to be done"
                />
                <button
                    type="submit"
                    className="btn btn-success"
                    >Add
                </button>
            </form>
        )
    }

}