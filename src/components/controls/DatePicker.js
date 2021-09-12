import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import React from 'react';

export default function DatePicker(props){
    
    const {name, label, value, onChange} = props

    
const convertToDefaultEventParants = (name, value) =>({
    target:{
        name:name,
        value:value
        }
})

    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disabletoolbar variant="inline" variant="outline"
                label={label}
                formate="MMM/dd/yyyy"
                name={name}
                value={value}
                onChange={date => onChange(convertToDefaultEventParants(name, date))}
                />
                

        </MuiPickersUtilsProvider>
    )
}