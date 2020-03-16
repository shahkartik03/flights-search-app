import React from 'react';
import './index.css';
import AvailableFlightDetails from './AvailableFlightDetails';
import FlightOptions from './FlightOptions';

function Flights() {
    return (
        <div className="flights">
            <AvailableFlightDetails />
            <FlightOptions />
        </div>
    );
}

export default Flights;
