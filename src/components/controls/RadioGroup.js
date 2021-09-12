import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup as MuiRadioGroup, TextField } from '@material-ui/core';

import React from 'react';

export default function RadioGroup(props){
    const {name, label, value, onChange, items} = props
    return(
        <FormControl>
        <FormLabel>{label}</FormLabel>
        <MuiRadioGroup row
            name={name}
            value={value}                        
            onChange={onChange}>
            {
                items.map(
                    (item) =>(
                        <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.tittle} />
                    )
                )
            }
            
        </MuiRadioGroup>

    </FormControl>
    )
}