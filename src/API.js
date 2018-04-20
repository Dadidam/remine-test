import axios from 'axios';

class API {
    constructor() {
        this._api = axios.create({ baseURL: 'http://localhost:8001' });
    }

    getLocations() {
        return this._api.get('locations');
    }

    getLocation(id) {
        return this._api.get(`locations/${id}`);
    }

    getBuildingTypes() {
        return this._api.get('buildingtypes');
    }
}

export default new API();
