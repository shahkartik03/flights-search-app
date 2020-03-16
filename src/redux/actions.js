import { fetFlightDetails } from '../api';
import * as actions from './actionType';
import { stringDateToTimeStamp } from '../utils/dateUtil';

const prepareFlights = (data, originCity, destinationCity, date) => {
    const directFlight = data.filter( flight => flight.origin === originCity
                                                && flight.destination === destinationCity
                                                && date === stringDateToTimeStamp(flight.date));
    directFlight.forEach(flight => {
                        return (flight.departureTime = new Date(Date.parse(`${flight.date}  ${flight.departureTime}`)),
                            flight.arrivalTime = new Date(Date.parse(`${flight.date}  ${flight.arrivalTime}`)))
    });
    const multiCity = data.filter(flight => (
                                        flight.origin === originCity || flight.destination === destinationCity)
                                        && !(flight.origin === originCity && flight.destination === destinationCity)
                                        && date === stringDateToTimeStamp(flight.date));
    multiCity.forEach(flight => {
                        return (flight.departureTime = new Date(Date.parse(`${flight.date}  ${flight.departureTime}`)),
                            flight.arrivalTime = new Date(Date.parse(`${flight.date}  ${flight.arrivalTime}`)))
    });
    const destinationFlights = [];
    const originFlights = [];
    multiCity.forEach((flight, index) => {
        if (flight.destination === destinationCity) {
            destinationFlights.push(index);
        } else if (flight.origin === originCity) {
            originFlights.push(index);
        }
    });
    const multiCityFlights = [];
    originFlights.forEach( (i, index) => {
        destinationFlights.forEach((d, index) => {
            if (multiCity[i].destination === multiCity[d].origin
                && (multiCity[d].departureTime - multiCity[i].arrivalTime > 0.3)) {
                const combination = [];
                combination.push(multiCity[i]);
                combination.push(multiCity[destinationFlights[index]]);
                multiCityFlights.push(combination);
            }
        });
    });
    return { directFlight, multiCityFlights };
};

export const fetchFlights = () => {
    return (dispatch, getState) => {
        dispatch({ type: actions.FETCH_FLIGHTS, payload: 'request' });
        fetFlightDetails()
            .then(response => {
                const {directFlight, multiCityFlights } = prepareFlights(response.data,
                    getState().flightSearch.originCity,
                    getState().flightSearch.destinationCity, getState().flightSearch.departureDate);
                if (getState().activeTab === 1) {
                    const { directFlight, multiCityFlights } = prepareFlights(response.data,
                        getState().flightSearch.destinationCity,
                        getState().flightSearch.originCity, getState().flightSearch.returnDate);
                    dispatch({ type: actions.RETURN_DIRECT_FLIGHTS, payload: directFlight });
                    dispatch({ type: actions.RETURN_MULTI_CITY_FLIGHTS, payload: multiCityFlights });
                }
                dispatch({ type: actions.DIRECT_FLIGHTS, payload: directFlight });
                dispatch({ type: actions.MULTI_CITY_FLIGHTS, payload: multiCityFlights });
            })
            .catch(err => {
                dispatch({ type: actions.FETCH_FLIGHTS, payload: 'error' });
            });
        dispatch({ type: actions.FETCH_FLIGHTS, payload: 'successful' });
    };
};


/*
export const fetchFlights = () => {
    return (dispatch, getState) => {
        fetFlightDetails()
            .then(response => {
                const directFlight = response.data.filter( flight => flight.origin === getState().originCity && flight.destination === getState().destinationCity );
                directFlight.forEach(flight => {
                    flight.departureTime = parseFloat(flight.departureTime.replace(":", "."))
                });
                directFlight.forEach(flight => {
                    flight.arrivalTime = parseFloat(flight.arrivalTime.replace(":", "."))
                });
                const multiCity = response.data.filter(flight => (
                    flight.origin === getState().originCity || flight.destination === getState().destinationCity)
                    && !(flight.origin === getState().originCity && flight.destination === getState().destinationCity));
                multiCity.forEach(flight => {
                    flight.departureTime = parseFloat(flight.departureTime.replace(":", "."))
                });
                multiCity.forEach(flight => {
                    flight.arrivalTime = parseFloat(flight.arrivalTime.replace(":", "."))
                });
                const destin = [];
                const origin = [];
                multiCity.forEach((flight, index) => {
                    if (flight.destination === getState().destinationCity) {
                        destin.push(index);
                    }
                });
                multiCity.forEach((flight, index) => {
                    if (flight.origin === getState().originCity) {
                        origin.push(index);
                    }
                });
                const flights = [];
                origin.forEach( (i, index) => {
                    destin.forEach((d, index) => {
                        if (multiCity[i].destination === multiCity[d].origin && (multiCity[d].departureTime - multiCity[i].arrivalTime > 0.3)) {
                            const combination = [];
                            combination.push(multiCity[i]);
                            combination.push(multiCity[destin[index]]);
                            flights.push(combination);
                        }
                    });
                });
                dispatch({ type: actions.DIRECT_FLIGHTS, payload: directFlight });
                dispatch({ type: actions.MULTI_CITY_FLIGHTS, payload: flights });
            });
    };
};
*/
