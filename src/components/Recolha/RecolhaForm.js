import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import {useForm, Form} from '../../components/useForm';
import Controls from '../../components/controls/Controls'
import * as recolhasercices from '../../services/recolhaservices'
import logosistema from '../../assets/img/Rh.jpg'


const genderItems = [
    {id:"male", tittle:"Male"},
    {id:"famele", tittle:"Famele"},
    {id:"others", tittle:"Others"}
]


const initialFormValues = {
    id:0,
    fullname:'',
    email:'',
    mobile:'',
    city:'',
    gender:'male',
    departamentId:'',
    hiredate: new Date(),
    isPermanent:false

}

export default function RecolhaForm(props){
    const {addOrEdit, recordForEdit} = props;

    const validate = (fieldvalues = values) =>{
     //Validacao dos Campos de texto em tempo real
     let temp = {...errors}
     if('fullname' in fieldvalues){         
            temp.fullname = fieldvalues.fullname?"":"This Field is Required"
     }
     if('email' in fieldvalues){         
            temp.email = (/$^|.+@+../).test(fieldvalues.email)?"":"Email is not Valid"
     }
     if('mobile' in fieldvalues){         
            temp.mobile = fieldvalues.mobile.length>9?"":"Minimun 10 number required"
     }
     if('departamentId' in fieldvalues){         
            temp.departamentId = fieldvalues.departamentId.length!=0?"":"This Field is Required"
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
            <Form  onSubmit={handleSubmit}>
                <Grid container>
                        <Grid item xs={6} >
                          <Controls.Input 
                            label="Full Name"
                            name="fullname"                            
                            type="text"
                            value={values.fullname}                        
                            onChange={handleInputChange}
                            error={errors.fullname}
                            />

                            <Controls.Input 
                            label="Email"                        
                            name="email"
                            type="text"
                            value={values.email}                        
                            onChange={handleInputChange}                            
                            error={errors.email}
                            />
                            <Controls.Input 
                            label="Mobile"                        
                            name="mobile"
                            type="text"
                            value={values.mobile}                        
                            onChange={handleInputChange}                            
                            error={errors.mobile}
                            />
                            <Controls.Input 
                            label="City"                        
                            name="city"
                            type="text"
                            value={values.city}                        
                            onChange={handleInputChange}
                            />
                            
                            <img src={logosistema} className="card-img-top" />
                            <div className="form-group">
                                <input type="file" accept="image/*" className="form-control-file">
                                
                                </input>
                            </div>

                        </Grid>
                        <Grid item xs={6} >
                            <Controls.RadioGroup 
                                name="gender"
                                label="Gender"
                                value={values.gender}
                                onChange={handleInputChange}
                                items={genderItems}
                            
                            />
                            <Controls.Select 
                            name="departamentId"
                            label="Departament"                            
                            value={values.departamentId}
                            onChange={handleInputChange}
                            options={recolhasercices.getDepartmentCollection()}                                                     
                            error={errors.departamentId}
                            />
                            <Controls.DatePicker 
                                name="hiredate"
                                label="Hire Date"
                                value={values.isPermanent}
                                onChange={handleInputChange}
                            />
                            <Controls.Checkbox  
                                name="isPermanent"
                                label="Permanent Recolha"
                                value={values.hiredate}
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