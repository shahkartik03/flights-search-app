import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';

function TypeAhead({ options, label, onChange }) {
    return (
        <div>
            <Autocomplete
                id={label}
                freeSolo
                options={options}
                onChange={onChange}
                renderInput={params => {
                    return (<TextField {...params} label={label} margin="normal" variant="outlined" />)
                }}
            />
        </div>
    );
}

export default TypeAhead;
