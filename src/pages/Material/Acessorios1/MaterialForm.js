import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useForm, Form } from '../../../components/useForm';
import Controls from '../../../components/controls/Controls'
import * as  servicesmaterial1 from '../../../services/material1services'
import * as servicescutsheetCalsa from '../../../services/cutsheetCalsaservices'
import logosistema from '../../../assets/img/Rh.jpg'
import { timePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
import api from '../../../services/api';

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
    nome: '',
    invoice_nr: '',
    cor_material: '',
    fk_id_tamanho: '',
    quantidade_material: '',
    cod_cone: ''

}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit } = props;    
    const [cutsheetSelect, setcutsheetSelect] = useState([]);
    
    const [stock, setstock] = useState([]); //vindo da BD 

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
    function getReferenciaByNome(tipo, nome) {
        if (tipo == "Calca" && nome == "Etiqueta")
            return servicesmaterial1.getReferenciaEtiquetaCalsaCollection();
        else if (tipo == "Camisa" && nome == "Etiqueta")
            return servicesmaterial1.getReferenciaEtiquetaCamisaCollection();
        else if (tipo == "Camisa" && nome == "Butao")
            return servicesmaterial1.getReferenciaButaoCamisaCollection()
        else return servicesmaterial1.getSemReferenciaCollection();
    }
    const handlecutsheet = e => {

        let target = e.target;
        let stockBycutsheet = ''
        let fk_id_cutsheet = target.value;
        values.fk_id_cutsheet = fk_id_cutsheet
        setcutsheetSelect(target.value);
        api.post('stock/listStockByCutsheet', { fk_id_cutsheet }).then(res => {

            stockBycutsheet = res.data.map(item => (
                { "id": item.pk_id_stock, "tittle": item.nome + '-' + item.cor_stock + ' ' + item.refencia + ' ' + item.tamanho }
            ))
            setstock(stockBycutsheet)
        });
    }
    function getTamanhoByNome(nome, tipo) {
        const big = []
        if (nome == "Zipper")
            return servicesmaterial1.getnrTamanhoZipperCollection();
        else if (nome == "Etiqueta")
            return servicesmaterial1.getnrTamanhoEtiquetaCollection();
        else if (nome == "Butao" && tipo == "Camisa")
            return servicesmaterial1.getnrTamanhoButaoCollection();
        else if (nome == "Intertela Calsa")
            return servicesmaterial1.getIntertelaCalsaCollection();
        else return servicesmaterial1.getSemTamanhoCollection();
    }

    function getCorByNome(nome, tipo, refrencia) {
        const big = []
        if (nome == "Zipper")
            return servicesmaterial1.getZipperCorCollection();
        else if (nome == "Etiqueta")
            return servicesmaterial1.getCorEtiquetaCollection();
        else if (nome == "Etiqueta")
            return servicesmaterial1.getCorEtiquetaCollection();
        else if (nome == "Butao" && tipo == "Calsa")
            return servicesmaterial1.getCorButaoCalsaCollection();
        else if (nome == "Butao" && tipo == "Camisa" && refrencia == "Fashion")
            return servicesmaterial1.getCorButaoFashionCollection();
        else if (nome == "Butao" && tipo == "Camisa" && refrencia == "Humbra" || refrencia == "Express")
            return servicesmaterial1.getcorIntertelaBolso();
        else return servicesmaterial1.getCorEtiquetaCollection();
    }
    function getTipoItemFinalCollection(nome) {
        const big = []
        if (nome == "Zipper")
            return servicesmaterial1.getTipoFimZipperCollection();
        else if (nome == "Etiqueta" || nome == "Butao")
            return servicesmaterial1.getTipoFimEtiquetaCollection();
        else if (nome == "Intertela Camisa")
            return servicesmaterial1.getCorRoloIntertelaCamisaCollection();
        else if (nome == "Intertela Calsa")
            return servicesmaterial1.getCorRoloIntertelaCalsaCollection();
        else if (nome == "Bolso")
            return servicesmaterial1.getcorIntertelaBolso();
        else return []
    }

    function getCod_ConeByNome(nome) {
        if (nome == "Linha") return values.cod_cone;
        else return "";

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
                        label="Tipo de Material"
                        name="nome"
                        value={values.nome}
                        onChange={handleInputChange}
                        options={servicesmaterial1.getnrNomeRoloCollection()}
                        error={errors.nome}
                    />
                    <Controls.Select
                        label="Tipo"
                        name="tipo"
                        value={values.tipo}
                        onChange={handleInputChange}
                        options={
                            getTipoItemFinalCollection(values.nome)
                        }
                        error={errors.tipo}
                    />
                    <Controls.Select
                        label="Referencia"
                        name="fk_id_referencia"
                        value={values.fk_id_referencia}
                        onChange={handleInputChange}
                        options={
                            getReferenciaByNome(values.tipo, values.nome)
                        }
                        error={errors.fk_id_referencia}
                    />


                    <Controls.Select
                        label="Cutsheet"
                        name="fk_id_cutsheet"
                        value={values.fk_id_cutsheet}
                        onChange={handleInputChange}
                        options={
                            servicescutsheetCalsa.GetcutsheetCollection()
                        }
                        error={errors.fk_id_cutsheet}
                    />

                    <Controls.Select
                        label="Tamanho"
                        name="fk_id_tamanho"
                        value={values.fk_id_tamanho}
                        onChange={handleInputChange}
                        options={getTamanhoByNome(values.nome, values.tipo)}
                        error={errors.fk_id_tamanho}
                    />

                </Grid>


                <Grid item xs={6} >

                    <Controls.Select
                        label="Cor"
                        name="cor_material"
                        value={values.cor_material}
                        onChange={handleInputChange}
                        options={
                            getCorByNome(values.nome, values.tipo, values.fk_id_referencia)
                        }
                        error={errors.cor_material}
                    />
                    <Controls.Input
                        label="Quantidade"
                        name="quantidade_material"
                        type="number"
                        value={values.quantidade_material}
                        onChange={handleInputChange}
                        error={errors.quantidade_material}
                    />
                    <Controls.Input
                        label="Codigo do Cone"
                        name="cod_cone"
                        type="number"
                        value={getCod_ConeByNome(values.nome)}
                        onChange={handleInputChange}
                        error={errors.cod_cone}
                    />
                    <Controls.Input
                        label="Numero de Invoice"
                        name="invoice_nr"
                        type="number"
                        value={values.invoice_nr}
                        onChange={handleInputChange}
                        error={errors.invoice_nr}
                    />



                    <div>
                        <Controls.Button
                            type="submit"
                            text="Guardar"
                        />
                        <Controls.Button
                            text="Reset"
                            color="Limpar Capos"
                            onClick={resetForm}
                        />

                    </div>

                </Grid>

            </Grid>

        </Form>
    )
}


