import axios from 'axios';

const request = axios.create({
    timeout: 60000,
});

export const fetFlightDetails = () => {
    return request({
        url: 'https://tw-frontenders.firebaseio.com/advFlightSearch.json'
    });
};