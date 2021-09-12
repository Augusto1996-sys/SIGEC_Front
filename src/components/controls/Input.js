import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';

export default function Input(props){
    const {name, label, value, error=null, onChange, type, ...others} = props;
    return(
        <TextField 
            variant="outlined" 
            label={label}                        
            name={name}
            type={type}
            value={value}                        
            onChange={onChange}
            {...others}
            {...(error && {error:true, helperText:error})}
         />
    )
}