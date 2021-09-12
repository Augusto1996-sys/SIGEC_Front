import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useForm, Form } from '../../../components/useForm';
import Controls from '../../../components/controls/Controls'
import * as  roloservices from '../../../services/roloservices'
import * as  cutsheetCalsaservices from '../../../services/cutsheetCalsaservices'
import * as  cutsheetcamisaservices from '../../../services/cutsheetCamisasservices'
import logosistema from '../../../assets/img/Rh.jpg'


const stateChoice = [
    { id: "masculino", tittle: "Masculino" },
    { id: "femenino", tittle: "Femenino" },
    { id: "outros", tittle: "Outros" }
]
const big = stateChoice;

const initialFormValues = {
    pk_id_material: 0,
    fk_id_referencia: '',
    fk_id_cutsheet: '',
    shade: '',
    metragem: '',
    nome: '',
    invoice_nr: '',
    cor_material: '',
    bale_number: '',
    estado_rolo: ''

}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit } = props;

    const histry = useHistory();

    const validate = (fieldvalues = values) => {
        //Validacao dos Campos de texto em tempo real
        let temp = { ...errors }


       
        setErrors({
            ...temp
        })
        /// O Values retorna a colecao que sta armazenada na variavel TEMP
        if (fieldvalues == values)
            return Object.values(temp).every(x => x == "")
    }


    function getReferenciaByNomeRolo(nome) {
        const big = []
        if (nome == "Tecido Calsa")
            return roloservices.getnrReferenciaTecidoCalsaCollection();
        else if (nome == "Tecido Camisa")
            return roloservices.getnrReferenciaTecidoCamisaCollection();
        else if (nome == "Intertela Camisa")
            return roloservices.getIntertelaCamisaCollection();
        else if (nome == "Intertela Calsa")
            return roloservices.getIntertelaCalsaCollection();
        else if (nome == "Bolso")
            return roloservices.getBolsoCollection();
        else return []
    }
    function getCorByTipoRoloCollection(nome) {
        const big = []
        if (nome == "Tecido Calsa")
            return roloservices.getCorRoloCalsaCollection();
        else if (nome == "Tecido Camisa")
            return roloservices.getCorRoloCamisaCollection();
        else if (nome == "Intertela Camisa")
            return roloservices.getCorRoloIntertelaCamisaCollection();
        else if (nome == "Intertela Calsa")
            return roloservices.getCorRoloIntertelaCalsaCollection();
        else if (nome == "Bolso")
            return roloservices.getcorIntertelaBolso();
        else return []
    }
    function getCutsheeByTipoRoloCollection(nome) {
        if (nome == "Tecido Camisa" || nome == "Intertela Camisa")
            return cutsheetcamisaservices.GetcutsheetCamisasCollection();
        else if (nome == "Intertela Calsa" || nome == "Intertela Calsa" || nome == "Bolso")
            return cutsheetCalsaservices.GetcutsheetCollection();
        else return [];
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
                        label="Tipo de Rolo"
                        name="nome"
                        value={values.nome}
                        onChange={handleInputChange}
                        options={roloservices.getnrNomeRoloCollection()}
                        error={errors.nome}
                    />
                    <Controls.Select
                        label="Referencia"
                        name="fk_id_referencia"
                        value={values.fk_id_referencia}
                        onChange={handleInputChange}
                        options={
                            getReferenciaByNomeRolo(values.nome)
                        }
                        error={errors.fk_id_referencia}
                    />
                    <Controls.Select
                        label="Cutsheet"
                        name="fk_id_cutsheet"
                        value={values.fk_id_cutsheet}
                        onChange={handleInputChange}
                        options={roloservices.GetcutsheetCollection()}
                        error={errors.fk_id_cutsheet}
                    />

                    <Controls.Select
                        label="Cor"
                        name="cor_material"
                        value={values.cor_material}
                        onChange={handleInputChange}
                        options={
                            getCorByTipoRoloCollection(values.nome)
                        }
                        error={errors.cor_material}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Gurdar"
                        />
                        <Controls.Button
                            text="Lipar Campos"
                            color="default"
                            onClick={resetForm}
                        />

                    </div>

                </Grid>


                <Grid item xs={6} >

                    <Controls.Select
                        name="shade"
                        label="Shade"
                        value={values.shade}
                        onChange={handleInputChange}
                        options={roloservices.getnrShadeRoloCollection()}
                        error={errors.shade}
                    />
                    <Controls.Input
                        label="Metragem"
                        name="metragem"
                        type="number"
                        value={values.metragem}
                        onChange={handleInputChange}
                        error={errors.metragem}
                    /><Controls.Input
                        label="Bale Number"
                        name="bale_number"
                        type="number"
                        value={values.bale_number}
                        onChange={handleInputChange}
                        error={errors.bale_number}
                    />
                    <Controls.Input
                        label="Numero de Invoice"
                        name="invoice_nr"
                        type="number"
                        value={values.invoice_nr}
                        onChange={handleInputChange}
                        error={errors.invoice_nr}
                    />

                </Grid>



            </Grid>

        </Form>
    )
}


