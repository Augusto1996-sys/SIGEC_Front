import React, { useState, useEffect } from 'react';
import MaterialForm from './MaterialForm';
import PageHeader from '../../../components/PageHeader'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import useTable from '../../../components/useTable'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { InputAdornment, InputLabel, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import Controls from '../../../components/controls/Controls';
import Popup from '../../../components/Popup'
import api from '../../../services/api';
import * as material1services from '../../../services/material1services'
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(3)

    },
    SearchInput: {
        width: '75%'

    }, newButton: {
        position: 'absolute',
        right: '10px'
    }
}))
const headersCells = [
    { id: 'pk_id_material', label: 'ID' },    
    { id: 'nome', label: 'Nome' },
    { id: 'fk_id_cutsheet', label: 'Cutsheet' },    
    { id: 'fk_id_referencia', label: 'Referencia' },
    { id: 'cor_material', label: 'Cor' },
    { id: 'quantidade', label: 'Quantidade' },
    { id: 'invoice_nr', label: 'Invoice' },
    { id: 'created_at_material', label: 'Data Registro' },
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
            const res = await api.get('/material1/listar_material1');
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

    const addOrEdit = (rolos, resetForm) => {
        if (rolos.pk_id_material > 0) {
            material1services.updaterolo(rolos)
        } else {
            material1services.insertrolo(rolos)

        }

        resetForm(); //Limpa o formulario
        setopenPopup(false); // Fecha o Modal        
        window.location.href = '/admin/usuario/materialIndex1'
    }
    function  getReferenciaType(params) {
        
        if(params == '') return "Sem Refrencia"
        else return params 
    }

    function getDta(params){
        const d = new Date(params)
        const mes = 1+d.getMonth(); 
         return(d.getDate()+"/"+mes+"/"+d.getFullYear())
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

    const deleteUserByID = id => { //Responsavel por Passar o ID a ser deletados
        material1services.deleteUser(id)
    }
    return (
        <>
            <PageHeader
                tittle="Material"
                subtittle="Formulario de Cadastro de Materiais! Pode Fazer a Busca Pelo Nome do Material"
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
                        text="Add New"
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
                            (<TableRow key={item.pk_id_material}>
                                <TableCell> {item.pk_id_material} </TableCell>                                 
                                <TableCell> {item.nome} </TableCell>           
                                <TableCell> {item.codigo_cutsheet} </TableCell>                                                    
                                <TableCell> {getReferenciaType(item.refencia)} </TableCell>
                                <TableCell> {item.cor_material} </TableCell>
                                <TableCell> {item.quantidade_material} </TableCell>
                                <TableCell> {item.invoice_nr} </TableCell> 
                                <TableCell> {getDta(item.created_at_material)} </TableCell>
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
                tittle="Rolo Form"
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