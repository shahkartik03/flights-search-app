import React from 'react';
import './index.css';
import Booking from './booking';
import Flights from './flights';

function FlightBooking() {
    return (
        <div className="flightBooking">
            <Booking />
            <Flights />
        </div>
    );
}

export default FlightBooking;