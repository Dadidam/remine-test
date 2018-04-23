import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RemineTable.css';

class RemineTable extends Component {
    render() {
        const loadingStyle = this.props.isLoading ? 'tableLoadingState' : '';
        return (
            <div className={`tableContainer ${loadingStyle}`}>
                <p>
                    Table length:{' '}
                    <strong>{this.props.properties.length}</strong>
                </p>
                <table className="remineTable">
                    <thead>
                        <tr>
                            <th>Address</th>
                            <th>Building Type</th>
                            <th>Beds</th>
                            <th>Baths</th>
                        </tr>
                    </thead>
                    <tbody className="remineTableBody">
                        {this.props.properties.map(property => (
                            <tr key={property.id}>
                                <td>{property.address}</td>
                                <td>{property.buildingType.name}</td>
                                <td>{property.beds}</td>
                                <td>{property.baths}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

RemineTable.defaultProps = {
    properties: []
};

RemineTable.propTypes = {
    properties: PropTypes.array
};

export default RemineTable;
