import * as actions from './actionType';
import { todayDate } from '../utils/dateUtil';

export const initState = {
    availableCities: ['Pune (PNQ)', 'Mumbai (BOM)', 'Bengaluru (BLR)', 'Delhi (DEL)'],
    activeTab: 0,
    searchExecuted: false,
    loading: {},
    flightSearch: {
        originCity: '',
        destinationCity: '',
        departureDate: todayDate(),
        returnDate: todayDate(),
        passengerCount: 0,
        range: [0, 5000],
        onlyDirectFlights: false,
        singleDirectFlights: [],
        singleMultiCityFlights: [],
        returnDirectFlights: [],
        returnMultiCityFlights: [],
    },
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case actions.FETCH_FLIGHTS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.type]: action.payload
                }
            }
        case actions.UPDATE_ACTIVE_TAB:
            return {
                ...state,
                searchExecuted: false,
                activeTab: action.payload
            };
        case actions.UPDATE_ORIGIN:
            return {
                ...state,
                flightSearch: {
                    ...state.flightSearch,
                    originCity: action.payload
                },
            };
        case actions.UPDATE_DESTINATION:
            return {
                ...state,
                flightSearch: {
                    ...state.flightSearch,
                    destinationCity: action.payload
                },
            };
        case actions.UPDATE_ORIGIN_DATE:
            return {
                ...state,
                flightSearch: {
                    ...state.flightSearch,
                    departureDate: action.payload
                },
            };
        case actions.UPDATE_DESTINATION_DATE:
            return {
                ...state,
                flightSearch: {
                    ...state.flightSearch,
                    returnDate: action.payload
                },
            };
        case actions.UPDATE_PASSENGER_COUNT:
            return {
                ...state,
                flightSearch: {
                    ...state.flightSearch,
                    passengerCount: action.payload
                },
            };
        case actions.DIRECT_FLIGHTS:
            return {
                ...state,
                searchExecuted: true,
                flightSearch: {
                    ...state.flightSearch,
                    singleDirectFlights: action.payload
                },
            };
        case actions.MULTI_CITY_FLIGHTS:
            return {
                ...state,
                searchExecuted: true,
                flightSearch: {
                    ...state.flightSearch,
                    singleMultiCityFlights: action.payload
                },
            };
        case actions.RETURN_DIRECT_FLIGHTS:
            return {
                ...state,
                searchExecuted: true,
                flightSearch: {
                    ...state.flightSearch,
                    returnDirectFlights: action.payload
                },
            };
        case actions.RETURN_MULTI_CITY_FLIGHTS:
            return {
                ...state,
                searchExecuted: true,
                flightSearch: {
                    ...state.flightSearch,
                    returnMultiCityFlights: action.payload
                },
            };
        case actions.UPDATE_RANGE:
            return {
                ...state,
                flightSearch: {
                    ...state.flightSearch,
                    range: action.payload
                },
            };
        case actions.UPDATE_DIRECT_FLIGHT_SWITCH:
            return {
                ...state,
                flightSearch: {
                    ...state.flightSearch,
                    onlyDirectFlights: action.payload
                },
            };
        default:
            return state;
    }
}
