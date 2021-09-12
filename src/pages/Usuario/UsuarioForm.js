import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls'
import * as recolhasercices from '../../services/recolhaservices'
import * as usuariosercices from '../../services/usuarioservices'
import logosistema from '../../assets/img/Rh.jpg'


const nivelItems = [
    { id: "Admin", tittle: "Administrador" },
    { id: "Spluser", tittle: "Usuario Simples" }
]

const stateItems = [
    { id: "enable", tittle: "Activo" },
    { id: "disable", tittle: "Desativo" },
]


const initialFormValues = {
    pk_id_usuarioc: 0,
    fullname: '',
    fk_id_funcionario: '',
    email: '',
    password: '',
    nivel: 'Admin',
    state: 'disable',

}

export default function UsuarioForm(props) {
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldvalues = values) => {
        //Validacao dos Campos de texto em tempo real
        let temp = { ...errors }

        if ('email' in fieldvalues) {
            temp.email = (/$^|.+@+../).test(fieldvalues.email) ? "" : "Email Invalido.. ex: zzz@gmail.com"
        }
        else if ('fullname' in fieldvalues) {
            temp.fullname = fieldvalues.fullname ? "" : "Preencha o campo do nome"
        }
        else if ('nivel' in fieldvalues) {
            temp.nivel = fieldvalues.nivel ? "" : "Preencha o Nome"
        }
        else if ('password' in fieldvalues) {
            temp.password = fieldvalues.password.length > 3 ? "" : "Minimo de 4 Caracteres Necessarios"
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
                        label="Nome Completo"
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
                        label="password"
                        name="password"
                        type="text"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Guardar"
                        />
                        <Controls.Button
                            text="Limpar Campos"
                            color="default"
                            onClick={resetForm}
                        />

                    </div>

                </Grid>
                <Grid item xs={6} >
                    <Controls.RadioGroup
                        name="nivel"
                        label="Tipo Usuario"
                        value={values.nivel}
                        onChange={handleInputChange}
                        items={nivelItems}

                    />

                    <Controls.RadioGroup
                        name="state"
                        label="Estado Usuario"
                        value={values.state}
                        onChange={handleInputChange}
                        items={stateItems}

                    />
                </Grid>

            </Grid>

        </Form>
    )
}