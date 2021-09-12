import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls'
import * as usuarioservices from '../../services/usuarioservices'

import logosistema from '../../assets/img/Rh.jpg'

const typeChoice = [
    { id: 'isRecolha', tittle: "Recolha" },
    { id: 'isFielArmazem', tittle: "Fiel Armazem" },
    { id: 'isCoordenador', tittle: "Coordenador" }
]
  

const stateChoice = [
    { id: 'enable', tittle: "Enable" },
    { id: 'disable', tittle: "Disable" }
]

const initialFormValues = {

    fk_id_funcionario: 0,
    email: '',
    password: '',
    isoque: 'isRecolha',
    state: 'disable'
}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit } = props;

    const histry = useHistory();

    const validate = (fieldvalues = values) => {
        //Validacao dos Campos de texto em tempo real
        let temp = { ...errors }


        if ('nr_bi' in fieldvalues) {
            temp.nr_bi = fieldvalues.nr_bi.length > 12 ? "" : "Minimun 12 number required"
        }
        if ('password' in fieldvalues) {
            temp.password = fieldvalues.password.length > 4 ? "" : "Minimun 4 number required"
        }
        if ('fk_id_tipo_usuario' in fieldvalues) {
            temp.fk_id_tipo_usuario = fieldvalues.fk_id_tipo_usuario.length != 0 ? "" : "This Field is Required"
        }
        setErrors({
            ...temp
        })
        /// O Values retorna a colecao que sta armazenada na variavel TEMP
        if (fieldvalues == values)
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


    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm)

        }
    }




    useEffect(() => {
        if (recordForEdit != null) {
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6} >

                    <Controls.Select
                        name="fk_id_funcionario"
                        label="Nome"
                        value={values.fk_id_funcionario}
                        onChange={handleInputChange}
                        options={usuarioservices.GetusuarioCollection()}
                        error={errors.fk_id_funcionario}
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
                        label="password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                </Grid>


                <Grid item xs={6} >
                    <Controls.RadioGroup
                        name="isoque"
                        label="Tipo Usuario"
                        value={values.isoque}
                        onChange={handleInputChange}
                        items={typeChoice}

                    />


                    <Controls.RadioGroup
                        name="state"
                        label="Estado Usuario"
                        value={values.state}
                        onChange={handleInputChange}
                        items={stateChoice}

                    />

                </Grid>


                <Grid item xs={6} >

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


