import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls'
import * as  funcionarioservices from '../../services/funcionarioservices'
import logosistema from '../../assets/img/Rh.jpg'


const stateChoice = [
    { id: "masculino", tittle: "Masculino" },
    { id: "femenino", tittle: "Femenino" },
    { id: "outros", tittle: "Outros" }
]

const initialFormValues = {
    pk_id_operario: 0,
    nome_operario: '',    
    nr_bi: '',          
    nr_nui: '',     
    nome_bairro: '',    
    quarteirao_nr: '',    
    data_nascimento: new Date(),
    genero: 'masculino',
    casa_nr: '',
    nr_telefone: '',
    nr_operario:''

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
        if ('nr_nui' in fieldvalues) {
            temp.nr_nui = fieldvalues.nr_nui.length > 12 ? "" : "Minimun 12 number required"
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

                    <Controls.Input
                        label="Nome"
                        name="nome_operario"
                        type="text"
                        value={values.nome_operario}
                        onChange={handleInputChange}
                        error={errors.nome_operario}
                    />
                    <Controls.Input
                        label="BI"
                        name="nr_bi"
                        type="text"
                        value={values.nr_bi}
                        onChange={handleInputChange}
                        error={errors.nr_bi}
                    />
                    <Controls.Input
                        label="NUIT"
                        name="nr_nui"
                        type="text"
                        value={values.nr_nui}
                        onChange={handleInputChange}
                        error={errors.nr_nui}
                    />
                    <Controls.Input
                        label="Telefone"
                        name="nr_telefone"
                        type="text"
                        value={values.nr_telefone}
                        onChange={handleInputChange}
                        error={errors.nr_telefone}
                    />
                    <Controls.RadioGroup
                        name="genero"
                        label="Genero"
                        value={values.genero}
                        onChange={handleInputChange}
                        items={stateChoice}

                    />


                </Grid>


                <Grid item xs={6} >
                    <Controls.Input
                        label="Codigo Operario"
                        name="nr_operario"
                        type="number"
                        value={values.nr_operario}
                        onChange={handleInputChange}
                        error={errors.nr_operario}
                    />

                    <Controls.Input
                        label="Nome Bairro"
                        name="nome_bairro"
                        type="text"
                        value={values.nome_bairro}
                        onChange={handleInputChange}
                        error={errors.nome_bairro}
                    />
                    <Controls.Input
                        label="Quarteirao"
                        name="quarteirao_nr"
                        type="text"
                        value={values.quarteirao_nr}
                        onChange={handleInputChange}
                        error={errors.quarteirao_nr}
                    />
                    <Controls.Input
                        label="Casa"
                        name="casa_nr"
                        type="text"
                        value={values.casa_nr}
                        onChange={handleInputChange}
                        error={errors.casa_nr}
                    />



                </Grid>


                <Grid item xs={6} >

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Gravar"
                        />
                        <Controls.Button
                            text="Limpar Campos"
                            color="default"
                            onClick={resetForm}
                        />

                    </div>

                </Grid>

            </Grid>

        </Form>
    )
}


