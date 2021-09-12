import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';
import React from 'react';

export default function Select(props){
    
    const {name, label, value, error=null, onChange, options} = props
    return(
        <FormControl        
        variant="outlined"        
        {...(error && {error:true})}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
            label={label}            
            name={name}
            value={value}                        
            onChange={onChange}
            
            {...(error && {error:true, helperText:error})}
            >
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.tittle}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}

        </FormControl>
    )
}