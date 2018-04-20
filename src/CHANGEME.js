import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API';

class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locations: [],
            buildingtypes: []
        };
    }
    componentDidMount() {
        API.getLocations()
            .then(response => {
                debugger;
                return response;
            })
            .catch(err => {
                return err;
            });
    }
    render() {
        return (
            <div className="testContainer">
                <div className="filterContainer">Your filters go here.</div>
                <RemineTable properties={[]} />
            </div>
        );
    }
}

export default Test;
