import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Switch from '@material-ui/core/Switch';
import FlightItinerary from './FlightItinerary';
import './flightOptions.css';
import {createErrorSelector, createLoadingSelector} from '../../../redux/selectors/loading';
import {FETCH_FLIGHTS, UPDATE_DIRECT_FLIGHT_SWITCH} from '../../../redux/actionType';
import { useFilteredFlight } from '../../../hooks/useFilteredFlight';

function FlightOptions () {
    const { singleDirectFlights, returnDirectFlights, singleMultiCityFlights, returnMultiCityFlights,
        passengerCount, range, onlyDirectFlights } = useSelector((state) => state.flightSearch);
    const dispatch = useDispatch();
    const isFetching = useSelector(state => createLoadingSelector([FETCH_FLIGHTS])(state));
    const isError = useSelector(state => createErrorSelector([FETCH_FLIGHTS])(state));
    const isReturn = useSelector((state) => state.activeTab === 1);
    const searchExecuted = useSelector(state => state.searchExecuted);
    const filteredSingleDirectFlight = useFilteredFlight(singleDirectFlights,
            flight => flight.price * passengerCount < range[1] );
    const filteredSingleMultiCityFlights = useFilteredFlight(singleMultiCityFlights,
            flight => (flight[0].price + flight[1].price) * passengerCount < range[1]);
    const filteredReturnDirectFlights = useFilteredFlight(returnDirectFlights,
            flight => flight.price * passengerCount < range[1]);
    const filteredReturnMultiCityFlights = useFilteredFlight(returnMultiCityFlights,
            flight => (flight[0].price + flight[1].price) * passengerCount < range[1]);
    const handleDirectSwitch = name => event => {
        dispatch({ type: UPDATE_DIRECT_FLIGHT_SWITCH, payload: event.target.checked });
    };
    const onwards = onlyDirectFlights
                    ? [ ...filteredSingleDirectFlight ]
                    : [ ...filteredSingleDirectFlight, ...filteredSingleMultiCityFlights ];
    const returns = onlyDirectFlights
                    ? [ ...filteredReturnDirectFlights ]
                    : [ ...filteredReturnDirectFlights, ...filteredReturnMultiCityFlights ];
    if (isError) {
        return (<div style={{ color: 'red' }}>
            Some error occurred while fetching the data
        </div>);
    }
    if (isFetching) {
        return (<div>
                    <CircularProgress />
                </div>);
    }
    if (!searchExecuted) {
        return <div>Quickly Search flights for best deals</div>;
    }
    const style = isReturn ? 'flightOptions' : '';
    return (
        <div className={style}>
            <div>
                <p style={{ display: 'inline-block' }}>
                    Only Direct FLights :
                </p>
                <Switch checked={onlyDirectFlights} onChange={handleDirectSwitch('directFlights')} value="directFlights" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="flightOptions_singleView">
                    {onwards.map((flight, index) => {
                        return (
                            <FlightItinerary keyIndex={index} flight={flight} passengers={passengerCount} />
                        )
                    })}
                </div>
                {isReturn &&
                <div className="flightOptions_singleView">
                    {returns.map((flight, index) => {
                        return (
                            <FlightItinerary keyIndex={index} flight={flight} passengers={passengerCount} />
                        )
                    })}
                </div>}
            </div>
        </div>
    );
}

export default FlightOptions;
