import React from 'react';
import { useSelector } from 'react-redux';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import './availableFlightDetails.css';
import { useFilteredFlight } from '../../../hooks/useFilteredFlight';

function AvailableFlightDetails() {
    const { originCity, destinationCity, singleDirectFlights, returnDirectFlights, singleMultiCityFlights,
        returnMultiCityFlights, range, passengerCount, onlyDirectFlights } = useSelector((state) => state.flightSearch);
    const searchExecuted = useSelector(state => state.searchExecuted);
    const isReturn = useSelector(state => state.activeTab === 1);
    const filteredSingleDirectFlight = useFilteredFlight(singleDirectFlights,
                                flight => flight.price * passengerCount < range[1] );
    const filteredSingleMultiCityFlights = useFilteredFlight(singleMultiCityFlights,
                                flight => (flight[0].price + flight[1].price) * passengerCount < range[1]);
    const filteredReturnDirectFlights = useFilteredFlight(returnDirectFlights,
                                flight => flight.price * passengerCount < range[1]);
    const filteredReturnMultiCityFlights = useFilteredFlight(returnMultiCityFlights,
                                flight => (flight[0].price + flight[1].price) * passengerCount < range[1]);
    const onwardsFlightCount = onlyDirectFlights
                                ? filteredSingleDirectFlight.length
                                : filteredSingleDirectFlight.length + filteredSingleMultiCityFlights.length;
    const returnFlightCount = onlyDirectFlights
                                ? filteredReturnDirectFlights.length
                                : filteredReturnDirectFlights.length + filteredReturnMultiCityFlights.length;
    if (!searchExecuted) {
        return <div/>;
    }
    return (
        <div className="availableFlightDetails">
            <div className="availableFlightDetails">
                <FlightTakeoffIcon fontSize="large"/>
                <div className="availableFlightDetails_details">
                    <p className="availableFlightDetails_details_cityName">{originCity} to {destinationCity}</p>
                    <p className="availableFlightDetails_details_count">{onwardsFlightCount} flight found</p>
                </div>
            </div>
            {isReturn &&
            <div className="availableFlightDetails">
                <FlightTakeoffIcon fontSize="large"/>
                <div className="availableFlightDetails_details">
                    <p className="availableFlightDetails_details_cityName">{destinationCity} to {originCity}</p>
                    <p className="availableFlightDetails_details_count">{returnFlightCount} flight found</p>
                </div>
            </div>}
        </div>
    );
}

export default AvailableFlightDetails;
