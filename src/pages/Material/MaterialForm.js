import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls'
import * as  roloservices from '../../services/roloservices'
import * as  cutsheetCalsaservices from '../../services/cutsheetCalsaservices'
import * as  cutsheetcamisaservices from '../../services/cutsheetCamisasservices'
import logosistema from '../../assets/img/Rh.jpg'


const initialFormValues = {
    pk_id_material: 0,
    fk_id_cutsheet: 0,
    nome: 0,
    qty_recebida: 0,
    qty_erequisitada: 0,
    qty_remanascente: 0

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
    function getCutsheeByTipoRoloCollection(nome) {
        if (nome == "Tecido Camisa" || nome == "Intertela Camisa")
            return cutsheetcamisaservices.GetcutsheetCamisasCollection();
        else if (nome == "Intertela Calsa" || nome == "Intertela Calsa" || nome == "Bolso")
            return roloservices.getCorRoloCamisaCollection();

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
                <Grid item xs={12} >

                    <Controls.Select
                        label="Tipo de Rolo"
                        name="nome"
                        value={values.nome}
                        onChange={handleInputChange}
                        options={roloservices.getnrNomeRoloCollection()}
                        error={errors.nome}
                    />
                    <Controls.Select
                        label="Cutsheet"
                        name="fk_id_cutsheet"
                        value={values.fk_id_cutsheet}
                        onChange={handleInputChange}
                        options={cutsheetCalsaservices.GetcutsheetCollection()}
                        error={errors.fk_id_cutsheet}
                    />




                </Grid>


                <Grid item xs={12} >

                    <Controls.Input
                        label="Quantidade C/S"
                        name="qty_erequisitada"
                        type="number"
                        value={values.qty_erequisitada}
                        onChange={handleInputChange}
                        error={errors.qty_erequisitada}
                    />
                    <Controls.Input
                        label="Quantidade Restante"
                        name="qty_remanascente"
                        type="number"
                        value={values.qty_remanascente}
                        onChange={handleInputChange}
                        error={errors.qty_remanascente}
                    />
                    <Controls.Input
                        label="Numero Recebida"
                        name="qty_recebida"
                        type="number"
                        value={values.qty_recebida}
                        onChange={handleInputChange}
                        error={errors.qty_recebida}
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


