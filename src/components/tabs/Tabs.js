import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as action from '../../redux/actionType';

function BookingTabs({ activeTab, handleChange, tabs }) {
    return (
        <Paper square>
            <Tabs
                value={activeTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                {tabs.map(tab => (
                    <Tab label={tab} />
                ))}
            </Tabs>
        </Paper>
    );
}

export default BookingTabs;