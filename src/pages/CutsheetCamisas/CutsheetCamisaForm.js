import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls'
import * as cutsheetCamisasservices from '../../services/cutsheetCamisasservices'
import api from '../../services/api';
import logosistema from '../../assets/img/Rh.jpg'

const stateChoice = [
    { id: "masculino", tittle: "Masculino" },
    { id: "femenino", tittle: "Femenino" },
    { id: "outros", tittle: "Outros" }
]

const initialFormValues = {
    pk_id_cutsheet: 0,

    codigo_cutsheet: '',
    metragem_tecido: '',
    cod_tecido1: '',
    cod_tecido2: '',
    cod_tecido3: '',


    metragem_intertela: '',
    cod_intertela1: '',
    cod_intertela2: '',
    metragem_bolso: '',
    cod_bolso1: '',
    cod_bolso2: '',////mhjjh


    especifidade_peca: '',
    quantidade_peca: '', //Comeca daqui  
    tipo_etiqueta: '',
    nr_cortes: '',
    cor: '',

    cod_cones: '',
}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit } = props;

    const [usuarios, setUsuarios] = useState([]); //vindo da BD
    //const histry =  useHistory();
    const [records, setRecords] = useState(null);
    const histry = useHistory();



    const validate = (fieldvalues = values) => {
        //Validacao dos Campos de texto em tempo real
        let temp = { ...errors }


        if ('nr_bi' in fieldvalues) {
            temp.nr_bi = fieldvalues.nr_bi.length > 3 ? "" : "Minimun 4 number required"
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
                        label="Codigo cutsheet"
                        name="codigo_cutsheet"
                        type="number"
                        value={values.codigo_cutsheet}
                        onChange={handleInputChange}
                        error={errors.codigo_cutsheet}
                    />

                    <Controls.Select
                        label="Tipo de Camisa"
                        name="especifidade_peca"
                        value={values.especifidade_peca}
                        onChange={handleInputChange}
                        options={cutsheetCamisasservices.getTipoPecaCollection()}
                        error={errors.especifidade_peca}
                    />


                    <Controls.Select
                        label="Cor do Artigo"
                        name="cor"
                        value={values.cor}
                        onChange={handleInputChange}
                        options={cutsheetCamisasservices.getCorPecaCollection()}
                        error={errors.cor}
                    />

                    <Controls.Input
                        label="Quantidade Total de Pecas"
                        name="quantidade_peca"
                        type="number"
                        value={values.quantidade_peca}
                        onChange={handleInputChange}
                        error={errors.quantidade_peca}
                    />
                    <Controls.Select
                        label="Codigo Principal de Tecido"
                        name="cod_tecido1"
                        value={values.cod_tecido1}
                        onChange={handleInputChange}
                        options={cutsheetCamisasservices.getTipoTecidoCollection()}
                        error={errors.cod_tecido1}
                    />
                    <Controls.Input
                        label="Metragem Total de Tecido"
                        name="metragem_tecido"
                        type="number"
                        value={values.metragem_tecido}
                        onChange={handleInputChange}
                        error={errors.metragem_tecido}
                    />

                </Grid>

                <Grid item xs={6} >

                    <Controls.Select
                        label="Tipo de Etiqueta"
                        name="tipo_etiqueta"
                        value={values.tipo_etiqueta}
                        onChange={handleInputChange}
                        options={cutsheetCamisasservices.getTipoEtiquetaCollection()}
                        error={errors.tipo_etiqueta}
                    />

                    <Controls.Input
                        label="Codigo Principal de Intertela"
                        name="cod_intertela1"
                        value={values.cod_intertela1}
                        onChange={handleInputChange}
                        options={cutsheetCamisasservices.getTipoIntertelaCollection()}
                        error={errors.cod_intertela1}
                    />
                    <Controls.Select
                        label="Codigo  Secundaria de Intertela"
                        name="cod_intertela2"
                        value={values.cod_intertela2}
                        onChange={handleInputChange}
                        options={cutsheetCamisasservices.getTipoIntertelaCollection()}
                        error={errors.cod_intertela2}
                    />

                    <Controls.Input
                        label="Metragem Total de Intertela"
                        name="metragem_intertela"
                        type="number"
                        value={values.metragem_intertela}
                        onChange={handleInputChange}
                        error={errors.metragem_intertela}
                    />
                    <Controls.Input
                        label="Codigo da Linha"
                        name="cod_cones"
                        type="number"
                        value={values.cod_cones}
                        onChange={handleInputChange}
                        error={errors.cod_cones}
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

        </Form >
    )
}


