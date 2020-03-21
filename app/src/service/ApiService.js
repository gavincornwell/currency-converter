import axios from 'axios';

const API_BASE_URL = 'https://ybmclr2c64.execute-api.us-east-1.amazonaws.com/Prod';

class ApiService {

    fetchCurrencies() {
        return axios.get(API_BASE_URL + "/currencies?amount=1");
    }
    
}

export default new ApiService();