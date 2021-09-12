import React, { useState, useEffect } from 'react';
import RecolhaForm from './Alocar_operarioForm';
import PageHeader from '../../components/PageHeader'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import useTable from '../../components/useTable'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { InputAdornment, InputLabel, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import * as recolhaservices from '../../services/recolhaservices'
import Controls from '../../components/controls/Controls';
import Popup from '../../components/Popup'
import api from '../../services/api';

import * as alocar_operario_services from '../../services/alocar_operarioservices'
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
    { id: 'pk_id_operario_linha', label: 'ID' },
    { id: 'fk_id_operario', label: 'Nome Operario' },    
    { id: 'fk_id_cutsheet', label: 'Cutsheet' },
    { id: 'mobile', label: 'Sector' },
    { id: 'email', label: 'Linha' },
    { id: 'fk_id_operacao', label: 'Operacao' },
    { id: 'actions', label: 'Actions', desableSorting: true },
]
export default function Recolha() {
    const classes = useStyles()
    const [recordForEdit, setrecordForEdit] = useState(null);
    
    const [cutsheet, setcutsheet] = useState([]); //vindo da BD
    const [records, setRecords] = useState([]);
    const [filtterFn, setFiltterFn] = useState({ fn: items => { return items } });
    const [openPopup, setopenPopup] = useState(false);

    useEffect(() => {
        async function loadcutsheet() {
            const res = await api.get('alocar_operario/listar_alocar_operario');
            setcutsheet(res.data)
        }
        loadcutsheet();
    }, [])

    useEffect(() => {
        if (cutsheet?.length > 0) {
            setRecords(cutsheet)
        }

    }, [cutsheet])

    const {
        TblContainer,
        TblHead,
        TblPaginition,
        recordsAfterPagingAndSorting
    } = useTable(records, headersCells, filtterFn)



    const addOrEdit = (employees, resetForm) => {
       alert(employees.pk_id_operario_linha )
        if (employees.pk_id_operario_linha == 0) 
          alocar_operario_services.insertAlocacao(employees)

        resetForm(); //Limpa o formulario
        setopenPopup(false); // Fecha o Modal
        setRecords(recolhaservices.getAllEmployees()) //Actualiza a tabela com os dados inseridos
    }
    const handleSearch = e => {
        let target = e.target;
        setFiltterFn({
            fn: items => {
                if (target.value == "") {
                    return items
                }
                else {
                    return items.filter(x => x.fullname.toLowerCase().includes(target.value))
                }
            }
        })
    }
    const openInPopupEdit = item => { //Responsavel por Passar os dados a serem editados
        setrecordForEdit(item);
        setopenPopup(true);
    }
    return (
        <>
            <PageHeader
                tittle="New Recolha"
                subtittle="Form with Validations"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                {/*<RecolhaForm    />*/}
                <Toolbar>
                    <Controls.Input
                        className={classes.SearchInput}
                        name="search"
                        label="Busca de Cutsheet"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}

                    >

                    </Controls.Input>
                    <Controls.Button
                        text="Alocar"
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
                            recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.pk_id_operario_linha}>
                                <TableCell> {item.pk_id_operario_linha} </TableCell>                                
                                <TableCell> {item.nome_operario} </TableCell>                                                             
                                <TableCell> {item.codigo_cutsheet} </TableCell>
                                <TableCell> {item.nome_sector} </TableCell>
                                <TableCell> {item.nr_linha} </TableCell>
                                <TableCell> {item.nome_operacao} </TableCell>   
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
                                        <DeleteIcon fontSize="small" />
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
                tittle="Formulario de Alocacao de Funcionarios"
                openPopup={openPopup}
                setOpenPopup={setopenPopup}
            >
                <RecolhaForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    )

}