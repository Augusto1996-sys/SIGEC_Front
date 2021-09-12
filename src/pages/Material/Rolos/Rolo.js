import React, { useState, useEffect } from 'react';
import RoloForm from './RoloForm';
import PageHeader from '../../../components/PageHeader'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import useTable from '../../../components/useTable'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/CameraRoll';
import { InputAdornment, InputLabel, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import Controls from '../../../components/controls/Controls';
import Popup from '../../../components/Popup'
import api from '../../../services/api';
import * as rolosercices from '../../../services/roloservices'
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
    { id: 'fk_id_referencia', label: 'Reference' },
    { id: 'codigo_cutsheet', label: 'Cutsheet' },
    { id: 'nome', label: 'Name' },
    { id: 'cor_material', label: 'Color' },
    { id: 'metragem', label: 'Metcion' },
    { id: 'bale_number', label: 'Bale Number' },
    { id: 'shade', label: 'Shade' },
    { id: 'created_at_material', label: 'Data' },
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
            const res = await api.get('/rolo/listar_rolo');
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
            rolosercices.updaterolo(rolos)
        } else {
            rolosercices.insertrolo(rolos)

        }

        resetForm(); //Limpa o formulario
        setopenPopup(false); // Fecha o Modal        
        window.location.href = '/admin/usuario/roloIndex'
    }
    const handleSearch = e => {
        let target = e.target;
        setFiltterFn({
            fn: items => {
                if (target.value == "") {
                    return items
                }
                else {
                    return items.filter(x => x.refencia.toLowerCase().includes(target.value))
                }
            }
        })
    }
    const openInPopupEdit = item => { //Responsavel por Passar os dados a serem editados
        setrecordForEdit(item);
        setopenPopup(true);
    }

    function getDta(params){
        const d = new Date(params)
        const mes = 1+d.getMonth(); 
         return(d.getDate()+"/"+mes+"/"+d.getFullYear())
     }

    const deleteUserByID = id => { //Responsavel por Passar o ID a ser deletados
        rolosercices.deleteUser(id)
    }
    return (
        <>
            <PageHeader
                tittle="Rolls MOZETEX"
                subtittle="Formulario com Validacao! Registro de Rolos {Bolso, Tecido e Intertela}, para a adicao de novos Rolos Pode fazer a buscar dos Rolos pela refrencia"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                {/*<roloForm    />*/}
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
                        text="Novo Rolo"
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
                                <TableCell> {item.refencia} </TableCell>
                                <TableCell> {item.codigo_cutsheet} </TableCell>
                                <TableCell> {item.nome} </TableCell>
                                <TableCell> {item.cor_material} </TableCell>
                                <TableCell> {item.metragem} </TableCell>
                                <TableCell> {item.bale_number} </TableCell>
                                <TableCell> {item.shade} </TableCell>
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
                <RoloForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    )
}