import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls'

import api from '../../services/api';
import logosistema from '../../assets/img/Rh.jpg'

const stateChoice = [
    { id: "masculino", tittle: "Masculino" },
    { id: "femenino", tittle: "Femenino" },
    { id: "outros", tittle: "Outros" }
]

const initialFormValues = {
    id_pessoa: 0,
    codigo_cutsheet: '',
    cod_tecido1: '',
    cod_tecido2: '',
    tipo_peca: '',
    nr_nui: '',
    nom1_bairro: '',
    quarteirao_nr: '',
    casa_nr: '',
    nr_telefone: '',
    data_nascimento: new Date()

}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit } = props;

    const [usuarios, setUsuarios] = useState([]); //vindo da BD
    //const histry =  useHistory();
    const [records, setRecords] = useState(null);
    const histry = useHistory();


    useEffect(() => {
        async function loadUsuarios() {
            const res = await api.post('/cutsheet/Listar_cutsheet');
            //setUsuarios(res.data)
        }
        loadUsuarios();
    }, [])

    useEffect(() => {
        if (usuarios?.length > 0) {
            setRecords(usuarios)
        }

    }, [usuarios])


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
                    {
                        console.log("initialFormValues")
                    }
                    <Controls.Input
                        label="Codigo cutsheet"
                        name="codigo_cutsheet"
                        type="text"
                        value={values.codigo_cutsheet}
                        onChange={handleInputChange}
                        error={errors.codigo_cutsheet}
                    />
                    <Controls.Input
                        label="Codigo Tecido Principal"
                        name="cod_tecido1"
                        type="text"
                        value={values.cod_tecido1}
                        onChange={handleInputChange}
                        error={errors.cod_tecido1}
                    />
                    <Controls.Input
                        label="Codigo Tecido Alternativo"
                        name="cod_tecido2"
                        type="text"
                        value={values.cod_tecido2}
                        onChange={handleInputChange}
                        error={errors.cod_tecido2}
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


                </Grid>

                <Grid item xs={6} >
                    <Controls.RadioGroup
                        name="genero"
                        label="Genero"
                        value={values.genero}
                        onChange={handleInputChange}
                        items={stateChoice}

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


