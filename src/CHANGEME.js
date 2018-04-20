import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import TextInput from './components/TextInput';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API';
import settings from './settings';

class Test extends Component {
    constructor(props) {
        super(props);

        const { minBeds, maxBeds, minBaths, maxBaths } = settings;

        this.state = {
            locations: [],
            buildingTypes: [],
            selectedTypes: [],
            minBeds,
            maxBeds,
            minBaths,
            maxBaths
        };
    }

    componentDidMount() {
        // fetch locations and buildingTypes from server
        axios
            .all([API.getLocations(), API.getBuildingTypes()])
            .then(
                axios.spread((locations, buildingTypes) => {
                    this.setState({
                        locations: locations.data,
                        buildingTypes: buildingTypes.data
                    });
                })
            )
            .catch(err => {
                console.error(err);
            });
    }

    onFilterChange = event => {
        const { id, value } = event.target;

        // cut non-number symbols
        let newValue = value.replace(/\D/g, '');

        // update input value
        event.target.value = newValue;

        // prepare new value to set as a part of state
        newValue = newValue.length ? _.toNumber(newValue) : settings[id];

        this.setState({ [id]: newValue });
    };

    applyFilters = () => {
        const {
            minBeds,
            maxBeds,
            minBaths,
            maxBaths,
            selectedTypes
        } = this.state;

        return _.filter(this.state.locations, loc => {
            const bedsCond = loc.beds >= minBeds && loc.beds <= maxBeds;
            const bathsCond = loc.baths >= minBaths && loc.baths <= maxBaths;
            const typesCond = selectedTypes.length
                ? _.includes(selectedTypes, loc.buildingType.name)
                : true;

            return bedsCond && bathsCond && typesCond;
        });
    };

    renderBuildingTypes = () => {
        return this.state.buildingTypes.map(type => {
            return (
                <label key={type.id}>
                    <input
                        type="checkbox"
                        name={type.name}
                        onChange={this.onCheckboxClick}
                    />
                    {type.name}
                </label>
            );
        });
    };

    onCheckboxClick = event => {
        const { name, checked } = event.target;
        const activeCheckboxes = [...this.state.selectedTypes];

        if (checked) {
            activeCheckboxes.push(name);
        } else {
            _.pull(activeCheckboxes, name);
        }

        this.setState({ selectedTypes: activeCheckboxes });
    };

    render() {
        const { locations } = this.state;
        const filteredLocations = this.applyFilters(locations);

        return (
            <div className="testContainer">
                <div className="filterContainer">
                    <form id="filters">
                        <div className="bedsFilter">
                            {'Beds: '}
                            <TextInput
                                id="minBeds"
                                isMin={true}
                                changeHandler={this.onFilterChange}
                            />
                            {' \u2014 '}
                            <TextInput
                                id="maxBeds"
                                changeHandler={this.onFilterChange}
                            />
                        </div>
                        <div className="bathsFilter">
                            {'Baths: '}
                            <TextInput
                                id="minBaths"
                                isMin={true}
                                changeHandler={this.onFilterChange}
                            />
                            {' \u2014 '}
                            <TextInput
                                id="maxBaths"
                                changeHandler={this.onFilterChange}
                            />
                        </div>
                        <div className="buildingTypesFilter">
                            {'Building Types: '}
                            {this.renderBuildingTypes()}
                        </div>
                    </form>
                </div>
                <RemineTable properties={filteredLocations} />
            </div>
        );
    }
}

export default Test;
