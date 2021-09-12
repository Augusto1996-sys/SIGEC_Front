import React, { useState } from 'react';
import RecolhaForm from './RecolhaForm';
import PageHeader from '../../components/PageHeader'
import SearchIcon  from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import useTable from '../../components/useTable'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { InputAdornment, InputLabel, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import * as recolhaservices from '../../services/recolhaservices'
import Controls from '../../components/controls/Controls';
import Popup from '../../components/Popup'
import * as recolhasercices from '../../services/recolhaservices'
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme =>({
    pageContent:{
        margin:theme.spacing(1),
        padding:theme.spacing(3)

    },
    SearchInput:{
        width:'75%'

    }, newButton:{
        position: 'absolute',
        right :'10px'
    }
}))
const headersCells = [    
    {id: 'fullname', label:'Full Name'},
    {id: 'email', label:'Email Address'},
    {id: 'mobile', label:'Mobile'},
    {id: 'department', label:'Department Name'},
    {id: 'actions', label:'Actions', desableSorting:true},
]
export default function Recolha(){
   const classes = useStyles()
   const [recordForEdit, setrecordForEdit] = useState(null);
   const [records, setRecords] = useState(recolhaservices.getAllEmployees());
   const [filtterFn, setFiltterFn] = useState({fn:items => {return items}});
   const [openPopup, setopenPopup] = useState(false);

       const {
           TblContainer,
           TblHead,
           TblPaginition,
           recordsAfterPagingAndSorting
        } = useTable(records, headersCells, filtterFn)


       
        const addOrEdit = (employees, resetForm) =>{
            alert(employees.id)
            if(employees.id == 0) //Verificando se eh para criar novo ususario ou editar atraves do id, se for 0 e adicionar
            recolhasercices.insertemployees(employees)
                else recolhasercices.updateEmployees(employees)
            resetForm(); //Limpa o formulario
            setopenPopup(false); // Fecha o Modal
            setRecords(recolhaservices.getAllEmployees()) //Actualiza a tabela com os dados inseridos
        }
        const handleSearch = e =>{
            let target = e.target;
            setFiltterFn({
               fn:items => {if(target.value == "") {
                    return items
                        }
                        else{
                            return items.filter(x => x.fullname.toLowerCase().includes(target.value))
                        }
             }
            })
        }
        const openInPopupEdit = item =>{ //Responsavel por Passar os dados a serem editados
            setrecordForEdit(item);
            setopenPopup(true);
        }
        return(
            <>
            <PageHeader 
                tittle ="New Recolha"
                subtittle ="Form with Validations"
                icon ={<PeopleOutlineTwoToneIcon fontSize="large"/>} 
             />
             <Paper className={classes.pageContent}>
                {/*<RecolhaForm    />*/}
                <Toolbar>
                    <Controls.Input
                        className={classes.SearchInput}
                        name="search"
                        label="Search Employees"  
                        InputProps = {{
                            startAdornment:(<InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>)
                        }}
                        onChange={handleSearch}
                  
                    >
                        
                    </Controls.Input>
                    <Controls.Button                        
                        text="Add New"
                        variant = "outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() =>setopenPopup(true)}
                        >
                    </Controls.Button>
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell> {item.fullname} </TableCell>
                                    <TableCell> {item.email} </TableCell>
                                    <TableCell> {item.mobile} </TableCell>                                    
                                    <TableCell> {item.departament} </TableCell>
                                    <TableCell>
                                       
                                        <Controls.ActionButton
                                            color="primary"
                                        >
                                           <EditIcon  fontSize="small"
                                            onClick={()=>openInPopupEdit(item)}
                                            /> 
                                        </Controls.ActionButton> 
                                        <Controls.ActionButton
                                            color="secondary"
                                        >
                                           <DeleteIcon fontSize="small"/> 
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
            tittle ="Employees Form"
            openPopup={openPopup}
            setOpenPopup={setopenPopup}
            >
             <RecolhaForm
             recordForEdit = {recordForEdit}  
             addOrEdit={addOrEdit} />
            </Popup>
            </>
        )
    
}