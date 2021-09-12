import React, { useState } from 'react';
import RecolhaForm from './RecolhaForm';
import PageHeader from '../../components/PageHeader'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import useTable from '../../components/useTable'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import * as recolhaservices from '../../services/recolhaservices'
import Controls from '../../components/controls/Controls';
import Popup from '../../components/Popup'
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import EditIcon from '@material-ui/icons/Edit';
import api from '../../services/api';


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

    { id: 'fk_id_cutsheet', label: 'Cutsheet' },
    { id: 'pk_id_stock', label: 'Material' },
    { id: 'quantidadeReuic', label: 'Armazem' },    
    { id: 'quantidadeReuic', label: 'Requisicao' },
    { id: 'actions', label: 'Actions', desableSorting: true },
]

export default function Recolha() {
    const classes = useStyles()
    const [employes, setemployes] = useState([]);
    const [recordForEdit, setrecordForEdit] = useState(null);
    const [records, setRecords] = useState(employes);
    const [filtterFn, setFiltterFn] = useState({ fn: items => { return items } });
    const [openPopup, setopenPopup] = useState(false);

    const [materialSelect, setmaterialSelect] = useState([]); //vindo da BD 

    const {
        TblContainer,
        TblHead,
        TblPaginition,
        recordsAfterPagingAndSorting
    } = useTable(records, headersCells, filtterFn)

    function getStockNome(pk_id_stock) { //Este metodo e aueque que me mandou Fazer  
        //const id= 0
        let res = api.post('stock/listQuantidadeByCutsheetandStockandRefern', { pk_id_stock }).then(res => {

            setmaterialSelect(res.data.nome)
            /*
             setmaterialSelect([...materialSelect,{
                id:id+1,
                nome:res.data.nome
            }])
        });
        return materialSelect;
            */
        });
        return materialSelect;
    }

    const addOrEdit = (employees, resetForm) => {
        if (employees.pk_id_requisicao == 0) //Verificando se eh para criar novo ususario ou editar atraves do id, se for 0 e adicionar
            if (employees.fk_id_cutsheet != 0) {
                setemployes([...employes, {
                    fk_id_cutsheet: employees.fk_id_cutsheet,
                    recolha: employees.recolha,
                    pk_id_stock: employees.pk_id_stock,
                    quantidade: employees.quantidade,
                    quantidadeReuic: employees.quantidadeReuic,
                    quantidadeReuic:employes.quantidadeReuic
                }]);
            } else alert("Preencha Todos Campos")
        //else recolhaservices.updateEmployees(employees)
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
                        label="Search Employees"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}

                    >

                    </Controls.Input>
                    <Controls.Button
                        text="Adicionar material"
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
                            employes.map(item =>
                            (<TableRow key={item.fk_id_cutsheet}>
                                <TableCell> {item.fk_id_cutsheet} </TableCell>
                                <TableCell> {item.pk_id_stock} </TableCell>
                                <TableCell> {item.quantidadeReuic}</TableCell>                                
                                <TableCell>{item.quantidadeReuic}</TableCell>
                                <TableCell>

                                    <Controls.ActionButton
                                        color="primary"
                                    >
                                        <EditIcon fontSize="small"
                                            onClick
                                            =
                                            {() => openInPopupEdit(item)}
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
            <div>

                <Controls.Button
                    text="Requisitar"
                    color="primary"
                />

                <Controls.Button
                    text="Canselar Requisicao"
                    color="default"
                />
            </div>
            <Popup
                tittle="Formulario de Requisicao"
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