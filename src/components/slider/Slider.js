import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function valuetext(value) {
    return `${value}`;
}

export default function RangeSlider( {label, text, range, handelSliderChange, max} ) {
    const [value, setValue] = React.useState(range);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        handelSliderChange(newValue);
    };

    return (
        <div style={{ marginTop: '20px', width: '400px', display: 'flex', justifyContent: 'space-between' }}>
            <Typography style={{ color: 'gray' }} id="range-slider" gutterBottom>
                {label}
            </Typography>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                max={max}
            />
        </div>
    );
}