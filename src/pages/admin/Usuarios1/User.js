import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import PageHeader from '../../components/PageHeader'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import useTable from '../../components/useTable'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { InputAdornment, InputLabel, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import Popup from '../../components/Popup'
import api from '../../services/api';
import * as usersercices from '../../services/userservices'
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
    { id: 'iduser', label: 'Id User' },
    { id: 'email', label: 'Email Address' },
    { id: 'state', label: 'State' },
    { id: 'department', label: 'Department Name' },
    { id: 'actions', label: 'Actions', desableSorting: true },
]
export default function User() {
    const classes = useStyles()
    const [recordForEdit, setrecordForEdit] = useState(null);
    const [filtterFn, setFiltterFn] = useState({ fn: items => { return items } });
    const [openPopup, setopenPopup] = useState(false);
    const [usuarios, setUsuarios] = useState([]); //vindo da BD
    //const histry =  useHistory();
    const [records, setRecords] = useState(null);

    useEffect(() => {
        async function loadUsuarios() {
            const res = await api.get('/user/listar_users');
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
    } = useTable(records?.length>0 && records, headersCells, filtterFn)

    const addOrEdit = (employees, resetForm) => {
        resetForm(); //Limpa o formulario
        if (employees.id_users == 0){ //Verificando se eh para criar novo ususario ou editar atraves do id, se for 0 e adicionar
           
           usersercices.insertemployees(employees)
        }else{
            usersercices.updateEmployees(employees)
        }
        
        resetForm(); //Limpa o formulario
        setopenPopup(false); // Fecha o Modal        
        window.location.href ='/admin/usuario/userMoztex'
    }
    const handleSearch = e => {
        let target = e.target;
        setFiltterFn({
            fn: items => {
                if (target.value == "") {
                    return items
                }
                else {
                    return items.filter(x => x.email.toLowerCase().includes(target.value))
                }
            }
        })
    }
    const openInPopupEdit = item => { //Responsavel por Passar os dados a serem editados
        setrecordForEdit(item);
        setopenPopup(true);
    }

    const deleteUserByID = id => { //Responsavel por Passar o ID a ser deletados
        usersercices.deleteUser(id)
    }
    return (
        <>
            <PageHeader
                tittle="New User"
                subtittle="Form with Validations, for create a new user"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                {/*<UserForm    />*/}
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
                            (<TableRow key={item.id_users}>
                                <TableCell> {item.id_users} </TableCell>
                                <TableCell> {item.email} </TableCell>
                                <TableCell> {item.state} </TableCell>
                                <TableCell> {item.tipo_usuario} </TableCell>
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
                                            onClick={() => deleteUserByID(item.id_users)}
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
                tittle="Users Form"
                openPopup={openPopup}
                setOpenPopup={setopenPopup}
            >
                <UserForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    )

}