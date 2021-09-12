import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import {useForm, Form} from '../../../components/useForm';
import Controls from '../../../components/controls/Controls'
import * as recolhasercices from '../../../services/recolhaservices'


const initialFormValues = {
    password:'',
    email:''
}

export default function LoginForm(props){
    const {addOrEdit, recordForEdit} = props;

    const validate = (fieldvalues = values) =>{
     //Validacao dos Campos de texto em tempo real
     let temp = {...errors}
     if('password' in fieldvalues){         
            temp.fullname = fieldvalues.fullname?"":"This Field is Required"
     }
     if('email' in fieldvalues){         
            temp.email = (/$^|.+@+../).test(fieldvalues.email)?"":"Email is not Valid"
     }
     
     setErrors({
         ...temp
     })
/// O Values retorna a colecao que sta armazenada na variavel TEMP
    if(fieldvalues == values)
     return Object.values(temp).every(x => x == "")
 }

 //Chamando Tudo que declaramos no UseForm
const {
    values,
    setValues,    
    errors,
    setErrors,
    handleInputChange,
    resetForm
} = useForm(initialFormValues, true, validate);

const handleSubmit =  e =>{
    e.preventDefault()
    validate()
}

        return(
            <Form  onSubmit={handleSubmit}>
                <Grid container>
                        <Grid item xs={6} >
                        <Controls.Input 
                            label="Type Email"                        
                            name="email"
                            type="text"
                            value={values.email}                        
                            onChange={handleInputChange}                            
                            error={errors.email}
                            />
                            <Controls.Input 
                            label="Type Password"                        
                            name="password"
                            type="text"
                            value={values.city}                        
                            onChange={handleInputChange}
                            />
                        </Grid>
        <div>
            <Controls.Button 
                type="submit"
                text="Login" 
            />
            <Controls.Button 
                text="Reset" 
                color="default"
                onClick={resetForm}
            />

        </div>

                        </Grid>
                
            </Form>
        )
}