import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import {Link, useHistory } from 'react-router-dom';
import {useForm, Form} from '../../components/useForm';
import Controls from '../../components/controls/Controls'
import * as userservices from '../../services/userservices'

import logosistema from '../../assets/img/Rh.jpg'

const stateChoice = [
    {id:"disable", tittle:"Disable"},
    {id:"enable", tittle:"Enable"}
]

const initialFormValues = {
    id_users1:0,
    email:'',
    password:'',
    state:'enable',
    fk_id_tipo_usuario:'',
    hiredate: new Date(),
    isPermanent:false

}

export default function UserForm(props){
    const {addOrEdit, recordForEdit} = props;
    
  const histry =  useHistory();

    const validate = (fieldvalues = values) =>{
     //Validacao dos Campos de texto em tempo real
     let temp = {...errors}
     
     if('email' in fieldvalues){         
            temp.email = (/$^|.+@+../).test(fieldvalues.email)?"":"Email is not Valid"
     }
     if('password' in fieldvalues){         
            temp.password = fieldvalues.password.length>9?"":"Minimun 10 number required"
     }
     if('fk_id_tipo_usuario' in fieldvalues){         
            temp.fk_id_tipo_usuario = fieldvalues.fk_id_tipo_usuario.length!=0?"":"This Field is Required"
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
        if(validate()){
            addOrEdit(values, resetForm)
            
        }
    }
    
    


useEffect(() =>{
    if(recordForEdit != null){
        setValues({
            ...recordForEdit
        })
    }
},[recordForEdit])

        return(
            <Form onSubmit={handleSubmit}>
                <Grid container>
                        <Grid item xs={6} >
                        
                            <Controls.Input 
                            label="Email"                        
                            name="email"
                            type="text"
                            value={values.email}                        
                            onChange={handleInputChange}                            
                            error={errors.email}
                            />
                            <Controls.Input 
                            label="Password"                        
                            name="password"
                            type="password"
                            value={values.password}                        
                            onChange={handleInputChange}                            
                            error={errors.password}
                            />

                        </Grid>
                        <Grid item xs={6} >
                            <Controls.RadioGroup 
                                name="state"
                                label="State"
                                value={values.state}
                                onChange={handleInputChange}
                                items={stateChoice}
                            
                            />
                            <Controls.Select 
                            name="fk_id_tipo_usuario"
                            label="User Type"                            
                            value={values.fk_id_tipo_usuario}
                            onChange={handleInputChange}
                            options={userservices.getDepartmentCollection()}                                                     
                            error={errors.fk_id_tipo_usuario}
                            />
                            <Controls.DatePicker 
                                name="hiredate"
                                label="Hire Date"
                                value={values.isPermanent}
                                onChange={handleInputChange}
                            />
        <div>
            <Controls.Button 
                type="submit"
                text="Submit" 
            />
            <Controls.Button 
                text="Reset" 
                color="default"
                onClick={resetForm}
            />

        </div>

                        </Grid>
                    
                </Grid>
                
            </Form>
        )
}


