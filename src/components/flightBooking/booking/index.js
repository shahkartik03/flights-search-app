import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import BookingTabs from '../../tabs/Tabs';
import TypeAhead from '../../typeAhead/TypeAhead';
import * as action from '../../../redux/actionType';
import DatePicker from '../../datePicker/DatePicker';
import {dateToTimeStamp, timeStampToDate} from '../../../utils/dateUtil';
import OptionSelect from '../../select/OptionSelect';
import {passengers, tabs} from '../../../constants';
import './index.css';
import { fetchFlights } from '../../../redux/actions';
import RangeSlider from '../../slider/Slider';

function Booking() {
    const availableCities = useSelector((state) => state.availableCities);
    const { originCity, destinationCity, departureDate, returnDate, passengerCount, range } = useSelector(state => state.flightSearch);
    const activeTab = useSelector(state => state.activeTab);
    const dispatch = useDispatch();
    const [allFieldsSelected, setAllFieldSelected] = useState(false);
    useEffect(() => {
        const checkFields = () => {
            return originCity !== '' && destinationCity !== '' && passengerCount !== 0;
        };
        setAllFieldSelected(checkFields);
    }, [originCity, destinationCity, passengerCount]);
    const selectCity = (event, value, type) => {
        const actionType = type === 'origin' ? action.UPDATE_ORIGIN : action.UPDATE_DESTINATION;
        dispatch({ type: actionType, payload: value });
    };

    const setDate = (date, type) => {
        const actionType = type === 'origin' ? action.UPDATE_ORIGIN_DATE : action.UPDATE_DESTINATION_DATE;
        dispatch({ type: actionType, payload: dateToTimeStamp(date) });
    };
    const selectPassenger = event => {
        dispatch({ type: action.UPDATE_PASSENGER_COUNT, payload: event.target.value });
    };
    const searchFlights = () => {
        dispatch(fetchFlights());
    };

    const changeSliderValue = newValue => {
        dispatch({ type: action.UPDATE_RANGE, payload: newValue });
    };

    const handleTabChange = (event, newValue) => dispatch({ type: action.UPDATE_ACTIVE_TAB, payload: newValue });

    return (
        <div className="booking">
            <BookingTabs activeTab={activeTab} handleChange={handleTabChange} tabs={tabs} />
            <div className="booking_Details">
                <TypeAhead options={availableCities.filter(city => !(city === destinationCity))} label="Origin" onChange={(e,v) => selectCity(e,v,'origin')} />
                <TypeAhead options={availableCities.filter(city => !(city === originCity))} label="Destination" onChange={(e,v) => selectCity(e,v,'destination')} />
                <div className="booking_DateSelection">
                    <Typography className="booking_Label">Departure</Typography>
                    <DatePicker selectedDate={timeStampToDate(departureDate)} handleDateChange={date => setDate(date, 'origin')} />
                </div>
                {activeTab === 1 &&
                <div className="booking_DateSelection">
                    <Typography className="booking_Label">Return</Typography>
                    <DatePicker selectedDate={timeStampToDate(returnDate)} handleDateChange={date => setDate(date, 'return')} />
                </div>}
                <OptionSelect handleChange={selectPassenger} value={passengerCount} options={passengers}/>
                <Button variant="contained" color="primary" onClick={searchFlights} disabled={!allFieldsSelected}>
                    Search
                </Button>
                <RangeSlider label="Price Range" text="Rs" range={range} handelSliderChange={changeSliderValue} max={40000} />
            </div>
        </div>
    );
}

export default Booking;