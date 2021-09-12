import React, { useState, useEffect } from 'react';
import MaterialForm from './MaterialForm';
import PageHeader from '../../components/PageHeader'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import useTable from '../../components/useTable'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/Games';
import { InputAdornment, InputLabel, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import Popup from '../../components/Popup'
import api from '../../services/api';
import * as cutsheetsercices from '../../services/cutsheetservices'
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
        width: '25%',
        right: '0px'
    }
    , newButton2: {
        position: 'absolute',
        right: '80px'
    }
}))
const headersCells = [
    { id: 'pk_id_stock', label: 'ID' },
    { id: 'fk_id_cutsheet', label: 'Cutsheet' },
    { id: 'nome', label: 'Item' },
    { id: 'fk_id_referencia', label: 'Reference' },
    { id: 'fk_id_tamanho', label: 'Size' },
    { id: 'stock', label: 'Color' },
    { id: 'qty_recebida', label: 'Qty Recived' },
    { id: 'qty_remanascente', label: 'Qty Store' },  
    { id: 'qty_erequisitada', label: 'Qty Request' }

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
            const res = await api.get('/stock/listar_stock');
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
        alert(employees.id_cutsheet)
        if (employees.id_cutsheet == 0) {
            alert("editando")
            // cutsheetsercices.updatecutsheet(employees)
        } else {
            //cutsheetsercices.insertemployees(employees)
        }

        resetForm(); //Limpa o formulario
        setopenPopup(false); // Fecha o Modal        
        window.location.href = '/admin/usuario/cutsheetMoztex'
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
    function getReferenciaType(params) {

        if (params == '') return "No Refrence" 
        else return params
    }
    function getCorQuantidade(quantidade, nome) {
        
        var arr = ['primary', 'default', 'secondary',]
        if (quantidade <= 100 && (nome=="Zipper" ||nome=="Etiqueta"||nome=="Tag"||nome=="Sello Tape")) {
            return 'secondary';
        }else if (quantidade > 100 && (nome=="Zipper" ||nome=="Etiqueta"||nome=="Tag"||nome=="Sello Tape")) {
            return 'primary';
        } else if (quantidade <= 1000 && (nome=="Butao" ||nome=="Linha"||nome=="Cartolina"||nome=="Intertela Calsa"||nome=="Bolso"||nome=="Tecido Calsa"||nome=="Tecido Camisa")) {
            return 'secondary';
        } else if (quantidade > 1000 && (nome=="Butao" ||nome=="Linha"||nome=="Cartolina"||nome=="Intertela Calsa"||nome=="Bolso"||nome=="Tecido Calsa"||nome=="Tecido Camisa")) {
            return 'primary';
        } 
    }
    function getReTamanhoType(params) {

        if (params == '') return "No Size"
        else return params
    }
    const deleteUserByID = id => { //Responsavel por Passar o ID a ser deletados
        cutsheetsercices.deleteUser(id)
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
                        label="Buscar Material Registrado"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}

                    >

                    </Controls.Input>
                    <Controls.Button
                        text="Adicionar Rolo"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => window.location.href = '/admin/usuario/roloIndex'}
                    >
                    </Controls.Button>
                    <Controls.Button
                        text="Adiconar  Acessorio"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton2}
                        onClick={() => window.location.href = '/admin/usuario/materialIndex1'}
                    >
                    </Controls.Button>
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        { 
                            recordsAfterPagingAndSorting()?.map(item =>
                            (<TableRow key={item.pk_id_stock}>
                                <TableCell> {item.pk_id_stock} </TableCell>
                                <TableCell> {item.codigo_cutsheet} </TableCell>
                                <TableCell> {item.nome} </TableCell>
                                <TableCell> {getReferenciaType(item.refencia)} </TableCell>
                                <TableCell> {getReTamanhoType(item.tamanho)} </TableCell>
                                <TableCell> {item.cor_stock} </TableCell>
                                <TableCell> {item.qty_recebida} </TableCell>
                                <TableCell>  <Chip label={item.qty_remanascente} color={getCorQuantidade(item.qty_remanascente,item.nome)} /></TableCell>                                
                                <TableCell> {item.qty_erequisitada} </TableCell>
                                
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPaginition />

            </Paper>
            <Popup
                tittle="Formulario de Cadastro e Edicao Material "
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