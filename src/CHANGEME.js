import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
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
        const newValue = value === '' ? settings[id] : Number(value);

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
                            <input
                                type="text"
                                id="minBeds"
                                size="5"
                                placeholder="Min"
                                maxLength="2"
                                onChange={this.onFilterChange}
                            />
                            {' \u2014 '}
                            <input
                                type="text"
                                id="maxBeds"
                                size="5"
                                placeholder="Max"
                                maxLength="2"
                                onChange={this.onFilterChange}
                            />
                        </div>
                        <div className="bathsFilter">
                            {'Baths: '}
                            <input
                                type="text"
                                id="minBaths"
                                size="5"
                                placeholder="Min"
                                maxLength="2"
                                onChange={this.onFilterChange}
                            />
                            {' \u2014 '}
                            <input
                                type="text"
                                id="maxBaths"
                                size="5"
                                placeholder="Max"
                                maxLength="2"
                                onChange={this.onFilterChange}
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
