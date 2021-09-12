import React, { useState, useEffect } from 'react';
import MaterialForm from './RequisicaoForm';
import PageHeader from '../../components/PageHeader'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import useTable from '../../components/useTable'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { InputAdornment, InputLabel, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import Popup from '../../components/Popup'
import api from '../../services/api';
import * as cutsheetsercices from '../../services/cutsheetservices'
import * as requisicaosercices from '../../services/requisicaoservices'
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(3)

    },
    SearchInput: {
        width: '50%'

    }, newButton: {
        width: '30%',
        right: '0px'
    }
    , newButton2: {
        position: 'absolute',
        right: '80px'
    }
}))

const headersCells = [
    { id: 'pk_id_requisicao', label: 'ID' },
    { id: 'fk_cutsheet', label: 'Cutsheet' },
    { id: 'nome_material', label: 'Material' },
    { id: 'fk_id_referencia', label: 'Referencia' },
    { id: 'cor_stock', label: 'Cor' },
    { id: 'quantidade', label: 'Quantidade' },
    { id: 'created_at', label: 'Data' },
    { id: 'actions', label: 'Actions', desableSorting: true },

]
export default function User() {
    const classes = useStyles()
    const [recordForEdit, setrecordForEdit] = useState([]);
    const [filtterFn, setFiltterFn] = useState({ fn: items => { return items } });
    const [openPopup, setopenPopup] = useState(false);
    const [usuarios, setUsuarios] = useState([]); //vindo da BD
    //const histry =  useHistory();
    const [records, setRecords] = useState(null);

    useEffect(() => {
        async function loadUsuarios() {
            const res = await api.get('/requisicao/Listar_requisicao');
            setUsuarios(res.data)
        }
        loadUsuarios();
    }, [])

    useEffect(() => {
        if (usuarios?.length > 0) {
            setRecords(usuarios)
        }

    }, [usuarios])


    const {
        TblContainer,
        TblHead,
        TblPaginition,
        recordsAfterPagingAndSorting
    } = useTable(records?.length > 0 && records, headersCells, filtterFn)

    const addOrEdit = (employees, resetForm) => {
        //alert(employees.pk_id_requisicao)
        if (employees.pk_id_requisicao == 0) {
            requisicaosercices.updaterolo(employees)
            resetForm(); //Limpa o formulario
            setopenPopup(false); // Fecha o Modal        
            window.location.href = '/admin/usuario/requisicaoindex'
        } else {
            if (employees.quantidade < employees.quantidadeReuic) {
                alert("A Quantidade Que pretende nao existe no Stock! Temos "+employees.quantidade+" Unidades apenas")
            } else {
                requisicaosercices.insertrolo(employees)
                resetForm(); //Limpa o formulario
                setopenPopup(false); // Fecha o Modal        
                window.location.href = '/admin/usuario/requisicaoindex'
            }
        }


    }

    function getDta(params){
       const d = new Date(params)
       const mes = 1+d.getMonth(); 
        return(d.getDate()+"/"+mes+"/"+d.getFullYear())
    }

    function getReferenciaType(params) {

        if (params == '') return "No Refrence"
        else return params
    }
    const handleSearch = e => {
        let target = e.target;
        setFiltterFn({
            fn: items => {
                if (target.value == "") {
                    return items
                }
                else {
                    return items.filter(x => x.nome.toLowerCase().includes(target.value))
                }
            }
        })
    }
    const openInPopupEdit = item => { //Responsavel por Passar os dados a serem editados
        setrecordForEdit(item);
        setopenPopup(true);
    }
    function getCorQuantidade(params) {


    }

    const deleteUserByID = id => { //Responsavel por Passar o ID a ser deletados
        cutsheetsercices.deleteUser(id)
    }
    return (
        <>
            <PageHeader
                tittle="Requisicao"
                subtittle="Faca Aqui a Sua Requisicao! Pode Buscar As Requisicoes ja Feitas atravez da Nome do Material"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                {/*<MaterialForm    />*/}
                <Toolbar>
                    <Controls.Input
                        className={classes.SearchInput}
                        name="search"
                        label="Search User"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}

                    >

                    </Controls.Input>
                    <Controls.Button
                        text="Nova Reqisicao "
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => setopenPopup(true)}
                    >
                    </Controls.Button>
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting()?.map(item =>
                            (<TableRow key={item.pk_id_requisicao}>
                                <TableCell> {item.pk_id_requisicao} </TableCell>
                                <TableCell> {item.codigo_cutsheet} </TableCell>
                                <TableCell> {item.nome} </TableCell>
                                <TableCell> {getReferenciaType(item.refencia)} </TableCell>
                                <TableCell> {item.cor_stock} </TableCell>
                                <TableCell>  <Chip label={item.quantidade_req} color="primary" /></TableCell>
                                <TableCell> {getDta(item.created_at)} </TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color="primary"
                                    >
                                        <EditIcon fontSize="small"
                                            onClick={() => openInPopupEdit(item)}
                                        />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                        color="secondary"
                                    >
                                        <DeleteIcon
                                            fontSize="small"
                                            onClick={() => deleteUserByID(item)}
                                        />
                                    </Controls.ActionButton>

                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPaginition />

            </Paper>
            <Popup
                tittle="Formulario de Requisicao"
                openPopup={openPopup}
                setOpenPopup={setopenPopup}
            >
                <MaterialForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    )

}