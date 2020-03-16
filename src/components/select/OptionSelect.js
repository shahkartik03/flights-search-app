import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './OptionSelect.css';
export default function OptionSelect({ value, options, handleChange }) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    return (
        <div className="optionSelect">
            <InputLabel id="inputlabel" className="optionSelect_label">Passengers</InputLabel>
            <Select
                labelId="selectlabel"
                id="selectlabel-name"
                value={value}
                onChange={handleChange}
                input={<Input style={{ padding: '0px 5px' }} />}
                className="optionSelect_Select"
                MenuProps={MenuProps}
            >
                {options.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}