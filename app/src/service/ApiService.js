import axios from 'axios';

const API_BASE_URL = '<api-url>';

class ApiService {

    fetchCurrencies() {
        return axios.get(API_BASE_URL + "/currencies?amount=1");
    }
    
}

export default new ApiService();