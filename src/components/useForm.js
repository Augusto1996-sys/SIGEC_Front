import React, {useState} from 'react';
import { Grid, makeStyles, TextField } from '@material-ui/core';


export  function useForm(initialFormValues, validateOnChange=false, validate){
    
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    //Fazendo preenchimento dos campos de texto
    const handleInputChange = e =>{
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })

        if(validateOnChange){
            validate({[name]:value})
        }
    }
    
const resetForm = ()=>{
    setValues(initialFormValues)
    setErrors({})
}
        return{
            values,
            setValues,
            errors,
            setErrors,
            handleInputChange,
            resetForm
        }
    
}


const useStyles = makeStyles(theme =>({
    //Configurando as TextFields
    root:{
        '& .MuiFormControl-root': {
            width:'75%',
            margin: theme.spacing(1),
            justify: 'center'
        }

    },
}))

 export function Form(props){
    
    const classes = useStyles()
    const {children, ...others} = props
         return(
            <form className ={classes.root} autoComplete="off" {...others}> 
                {props.children}

            </form>
         )
     
 }