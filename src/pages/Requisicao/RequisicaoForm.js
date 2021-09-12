import { FormControl, FormControlLabel, FormLabel, Grid, Input, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls'
import * as  requisicaoservices from '../../services/requisicaoservices'
import * as cutsheetservices from '../../services/cutsheetservices'
import * as usuariosercices from '../../services/usuarioservices'
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
    pk_id_requisicao: 0,
    recolha: '',
    pk_id_stock: '',
    quantidade: '',
    quantidadeReuic:''

    
}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit } = props;
    const [recolhasSelect, setrecolhasSelect] = useState([]);
    const [cutsheetSelect, setcutsheetSelect] = useState([]);
    const [cutsheet, setcutsheet] = useState([]); //vindo da BD
    const [stock, setstock] = useState([]); //vindo da BD 
    const [materialSelect, setmaterialSelect] = useState([]); //vindo da BD 

    const [referencia, setreferencia] = useState([]); //vindo da BD
    const [refrenciaSelect, setreferenciaSelect] = useState([]); //vindo da BD 

    const [tamanhoSelect, settamanhoSelect] = useState([]); //vindo da BD     
    const [tamanho, settamanho] = useState([]); //vindo da BD

    const [corSelect, setcorSelect] = useState([]); //vindo da BD     
    const [cor, setcor] = useState([]); //vindo da BD



    const [quantidadecorSelect, setquantidadeSelect] = useState([]); //vindo da BD     
    const [quantidade, setquantidade] = useState([]); //vindo da BD

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
            return requisicaoservices.getReferenciaEtiquetaCalsaCollection();
        else if (tipo == "Camisa" && nome == "Etiqueta")
            return requisicaoservices.getReferenciaEtiquetaCamisaCollection();
        else if (tipo == "Camisa" && nome == "Butao")
            return requisicaoservices.getReferenciaButaoCamisaCollection()
        else return requisicaoservices.getSemReferenciaCollection();
    }

    function getTamanhoByNome(nome, tipo) {
        const big = []
        if (nome == "Zipper")
            return requisicaoservices.getnrTamanhoZipperCollection();
        else if (nome == "Etiqueta")
            return requisicaoservices.getnrTamanhoEtiquetaCollection();
        else if (nome == "Butao" && tipo == "Camisa")
            return requisicaoservices.getnrTamanhoButaoCollection();
        else if (nome == "Intertela Calsa")
            return requisicaoservices.getIntertelaCalsaCollection();
        else return []
    }

    function getCorByNome(nome, tipo, refrencia) {
        const big = []
        if (nome == "Zipper")
            return requisicaoservices.getZipperCorCollection();
        else if (nome == "Etiqueta")
            return requisicaoservices.getCorEtiquetaCollection();
        else if (nome == "Etiqueta")
            return requisicaoservices.getCorEtiquetaCollection();
        else if (nome == "Butao" && tipo == "Calsa")
            return requisicaoservices.getCorButaoCalsaCollection();
        else if (nome == "Butao" && tipo == "Camisa" && refrencia == "Fashion")
            return requisicaoservices.getCorButaoFashionCollection();
        else if (nome == "Butao" && tipo == "Camisa" && refrencia == "Humbra" || refrencia == "Express")
            return requisicaoservices.getcorIntertelaBolso();
        else if (nome == "Linha") return requisicaoservices.getCorLinhaCollection();
        else return []
    }
    function getTipoItemFinalCollection(nome) {
        const big = []
        if (nome == "Zipper")
            return requisicaoservices.getTipoFimZipperCollection();
        else if (nome == "Etiqueta" || nome == "Butao")
            return requisicaoservices.getTipoFimEtiquetaCollection();
        else if (nome == "Intertela Camisa")
            return requisicaoservices.getCorRoloIntertelaCamisaCollection();
        else if (nome == "Intertela Calsa")
            return requisicaoservices.getCorRoloIntertelaCalsaCollection();
        else if (nome == "Bolso")
            return requisicaoservices.getcorIntertelaBolso();
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


    const handlecutsheet = e => { 
        let target = e.target;
        let cutsheetByreferencia = ''
        let fk_id_funcionario = target.value;
        values.recolha = fk_id_funcionario     
        setrecolhasSelect(target.value);
        api.post('cutsheet/listar_cutsheetByRecoha', { fk_id_funcionario }).then(res => {

            ///console.log(res.data)
            //setcutsheet = res.data
            cutsheetByreferencia = res.data.map(item => (
                { "id": item.pk_id_cutsheet, "tittle": item.codigo_cutsheet }
            ))
            setcutsheet(cutsheetByreferencia)
        });
    }
    const handlestock = e => { 

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

    const handlequanty = e => { //Este metodo e aueque que me mandou Fazer
        let target = e.target;
        let pk_id_stock = target.value
        values.pk_id_stock = pk_id_stock
        setmaterialSelect(target.value);
        let res = api.post('stock/listQuantidadeByCutsheetandStockandRefern', {pk_id_stock}).then(res => {

            setquantidadeSelect(res.data.qty_remanascente)
            values.quantidade = res.data.qty_remanascente
        });

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
                        name="recolhasSelect"
                        label="Nome Recolha"
                        value={values.recolhasSelect}
                        onChange={handlecutsheet}
                        options={usuariosercices.GetusuarioCollection()}
                        error={errors.recolhasSelect}
                    />
                    <Controls.Select
                        label="Cutsheet"
                        name="cutsheetSelect"
                        value={cutsheetSelect}
                        onChange={handlestock}
                        options={cutsheet}
                        error={errors.cutsheetSelect}
                    />
                    <Controls.Select
                        label="Tipo de Material"
                        name="materialSelect"
                        value={materialSelect}
                        onChange={handlequanty}
                        options={stock}
                        error={errors.materialSelect}
                    />

                </Grid>


                <Grid item xs={6} >
                    <Controls.Input
                        label="Quantidade no Stock"
                        name="quantidadecorSelect"
                        type="number"
                        value={quantidadecorSelect}
                        onChange={handleInputChange}
                        error={errors.quantidadecorSelect}
                    />
                    <Controls.Input
                        label="Quantidade a Requisitar"
                        name="quantidadeReuic"
                        type="number"
                        value={values.quantidadeReuic}
                        onChange={handleInputChange}
                        error={errors.quantidadeReuic}
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

            </Grid>

        </Form>
    )
}


