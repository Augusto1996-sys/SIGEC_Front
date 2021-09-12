import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls'
import * as  requisicaoservices from '../../services/requisicaoservices'
import * as rolosercices from '../../services/roloservices'
import * as usuariosercices from '../../services/usuarioservices'

import * as alocar_operario_services from '../../services/alocar_operarioservices'
import logosistema from '../../assets/img/Rh.jpg'

import api from '../../services/api';
import { timePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';


const stateChoice = [
    { id: "masculino", tittle: "Masculino" },
    { id: "femenino", tittle: "Femenino" },
    { id: "outros", tittle: "Outros" }
]
const big = stateChoice;

const initialFormValues = {
    pk_id_operario_linha: 0,
    fk_id_operario: '',
    fk_id_linha: '',
    fk_id_operacao: '',
    fk_id_cutsheet: '',
    nome_sector: ''
}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit } = props;
    const [materialSelect, setmaterialSelect] = useState([]); //vindo da BD 
    const histry = useHistory();


    const validate = (fieldvalues = values) => {
        //Validacao dos Campos de texto em tempo real
        let temp = { ...errors }

        if ('fk_id_operario' in fieldvalues) {
            temp.fk_id_operario = fieldvalues.fk_id_operario.length != 0 ? "" : "Esolha o Operarios a Alocar"
        }
        if ('fk_id_linha' in fieldvalues) {
            temp.fk_id_linha = fieldvalues.fk_id_linha.length != 0 ? "" : "Esolha a Linha"
        }
        if ('fk_id_operacao' in fieldvalues) {
            temp.fk_id_operacao = fieldvalues.fk_id_operacao.length != 0 ? "" : "Esolha a Operacao"
        }
        if ('fk_id_cutsheet' in fieldvalues) {
            temp.fk_id_cutsheet = fieldvalues.fk_id_cutsheet.length != 0 ? "" : "Esolha o Cutsheet"
        }
        if ('nome_sector' in fieldvalues) {
            temp.nome_sector = fieldvalues.nome_sector.length != 0 ? "" : "Esolha o Sector"
        }
       
        setErrors({
            ...temp
        })
        /// O Values retorna a colecao que sta armazenada na variavel TEMP
        if (fieldvalues == values)
            return Object.values(temp).every(x => x == "")
    }


    function getLinha(sector) {
        const big = []
        if (sector == "prod")
            return alocar_operario_services.getLinhaCollection();
        else if (sector == "cut")
            return alocar_operario_services.getLinhaCorteCollection();
        else if (sector == "acab")
            return alocar_operario_services.getLinhaAcabamentoCollection();
        else return []
    }


    function getOperacao(sector) {
        if (sector == "prod")
            return alocar_operario_services.getOperacaoesProducaoCollection();
        else if (sector == "store")
            return alocar_operario_services.getOperacaoesArmazemCollection();
        else if (sector == "cut")
            return alocar_operario_services.getOperacaoesCorteCollection();
        else if (sector == "acab")
            return alocar_operario_services.getOperacaoesAcabamentoCollection();
        else return []
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
                        name="fk_id_operario"
                        label="Nome do Funcionario"
                        value={values.fk_id_operario}
                        onChange={handleInputChange}
                        options={usuariosercices.GetusuarioCollection()}
                        error={errors.fk_id_operario}
                    />
                    <Controls.Select
                        label="Cutsheet"
                        name="fk_id_cutsheet"
                        value={values.fk_id_cutsheet}
                        onChange={handleInputChange}
                        options={rolosercices.GetcutsheetCollection()}
                        error={errors.fk_id_cutsheet}
                    />
                    <Controls.Select
                        label="Sector"
                        name="nome_sector"
                        value={values.nome_sector}
                        onChange={handleInputChange}
                        options={alocar_operario_services.getSectorCollection()}
                        error={errors.nome_sector}
                    />

                </Grid>


                <Grid item xs={6} >
                    <Controls.Select
                        label="Sleciona a Linha"
                        name="fk_id_linha"
                        value={values.fk_id_linha}
                        onChange={handleInputChange}
                        options={getLinha(values.nome_sector)}
                        error={errors.fk_id_linha}
                    />
                    <Controls.Select
                        label="Operacao"
                        name="fk_id_operacao"
                        options={getOperacao(values.nome_sector)}
                        value={values.fk_id_operacao}
                        onChange={handleInputChange}
                        error={errors.fk_id_operacao}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Adicionar"
                        />
                        <Controls.Button
                            text="Reniciar"
                            color="default"
                            onClick={resetForm}
                        />

                    </div>

                </Grid>

            </Grid>

        </Form>
    )
}


