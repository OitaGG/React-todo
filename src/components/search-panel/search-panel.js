import React, {Component} from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchLabel: ''
        }
    }

    onSearchLabelChanged = (event) => {
        this.setState({
            searchLabel: event.target.value
        });
        this.props.onSearch(event.target.value)
    };

    render() {
        const {onSearch} = this.props.onSearch;
        const searchText = 'Type something';
        return (
            <input type="text" className="form-control search-input"
                   placeholder={searchText}
                   value={this.state.searchLabel}
                   onChange={this.onSearchLabelChanged}
            />
        );
    }
};
