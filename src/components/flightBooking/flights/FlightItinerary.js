import React, { useState } from 'react';
import FlightIcon from '@material-ui/icons/Flight';
import { Button } from '@material-ui/core';
import { cities } from '../../../constants';
import {diff_minutes, getTime} from '../../../utils/dateUtil';
import './FlightItinerary.css';

const FLightAttributes = ({ label, value, showMultiCityDetails }) => {
    let style = 'attribute_value';
    if (value === 'show details') {
        style = 'attribute_details';
    } else if (value === 'Non Stop') {
        style = 'attribute_nonStop';
    }
    return (
        <div className="attribute">
            <div className="attribute_label">{label}</div>
            <div className={style} onClick={showMultiCityDetails}>{value}</div>
        </div>
    );
};

function DirectFLight({ keyIndex, flight, isMultiAirline = false, passengers }) {
    return (
        <div key={keyIndex} className="flightItinerary">
            <FlightIcon />
            <FLightAttributes label={flight.name} value={flight.flightNo} />
            <FLightAttributes label={getTime(flight.departureTime)} value={cities.get(flight.origin)} />
            <FLightAttributes label={getTime(flight.arrivalTime)} value={cities.get(flight.destination)} />
            <FLightAttributes label={diff_minutes(flight.arrivalTime, flight.departureTime)} value="Non Stop" />
            <div className="flightItinerary_Price">{!isMultiAirline && `Rs ${flight.price * passengers}`}</div>
            {!isMultiAirline ? <Button  variant="contained" color="secondary">Book</Button> : <div/>}
            {isMultiAirline && <div/>}
            {isMultiAirline && <div/>}
        </div>
    );
}

function FlightItinerary({ keyIndex, flight, passengers }) {
    const [ detailView, setDetailView ] = useState(false);
    const openDetails = key => {
        setDetailView(!detailView);
    };
    if (flight instanceof Array) {
        return (
            <div>
                <div key={keyIndex} className="flightItinerary">
                    <FlightIcon />
                    <FLightAttributes label="Multiple" value="show details" showMultiCityDetails={() => openDetails(keyIndex)}/>
                    <FLightAttributes label={getTime(flight[0].departureTime)} value={cities.get(flight[0].origin)} />
                    <FLightAttributes label={getTime(flight[1].arrivalTime)} value={cities.get(flight[1].destination)} />
                    <FLightAttributes label={diff_minutes(flight[1].arrivalTime, flight[0].departureTime)} value="Total duration" />
                    <div className="flightItinerary_Price">Rs {(flight[0].price + flight[1].price) * passengers}</div>
                    <Button variant="contained" color="secondary">Book</Button>
                </div>
                {detailView &&
                <div className="flightItinerary_MultiAirline_details">
                    <DirectFLight flight={flight[0]} isMultiAirline={true} passengers={passengers} />
                    <h2><span>Layover Time {diff_minutes(flight[1].departureTime, flight[0].arrivalTime)}</span></h2>
                    <DirectFLight flight={flight[1]} isMultiAirline={true} />
                </div>
                }
            </div>
        );
    } else {
        return <DirectFLight keyIndex={keyIndex} flight={flight} passengers={passengers}/>;
    }
}

export default FlightItinerary;
