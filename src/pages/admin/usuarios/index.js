import React, {useState, useEffect}from 'react';
import {Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin'
import Footer from '../../../components/footer-admin';
import api from '../../../services/api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {getusuarioTipo, getusuarioTipoLabel} from '../../../functions/static_data';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  submit: {margin: theme.spacing(3, 0, 2),},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(4),paddingBottom: theme.spacing(4),},
  paper: {padding: 15,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  formControl:{width:'100%'}}));


export default function UsuarioListar() {
  const classes = useStyles(); 
  const histry =  useHistory();

  const [usuarios, setUsuarios] = useState([]);

  const [IsModalVisible, setIsModalVisible] = useState(false);

  useEffect(() =>{
      async function loadUsuarios(){
        const res = await api.get('/user/listar_users');
        console.log(res.data);
        setUsuarios(res.data)
      }
      loadUsuarios();
  }, [])
  
async function handleDelate(id){
  if(window.confirm("Deseja Realmente Excluir este Usuario?")){
      const result = await api.post('/user/deleteUsuarioByID/'+id);
      if(result.status == 204){  
        window.location.href ='/admin/usuario'
      }else if(result.status != 204){
        alert('Ocorreu Um Erro')
      }
   
  }

}
  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'USUARIO'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          <Grid item  sm={12}>
              <Paper className ={classes.paper}>
                
          <h2>Lista de Usuarios Admin</h2>
              <Grid container spacing={3}>
               
               <Grid item xs={12} sm={12}>
               <TableContainer component={Paper}>
            
             
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
           <TableCell>Id</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Tipo Usuario</TableCell>
            <TableCell align="center">Data Registro</TableCell>
            <TableCell align="rigth">Opcoes</TableCell>
          </TableRow>
        </TableHead>
       <TableBody>
            {usuarios.map((row) => (
            <TableRow key={row.id_users}>
              <TableCell align="center" component="th" scope="row">
                {row.id_users}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">
                            <Chip  label={getusuarioTipo(row.fk_id_tipo_usuario)}  color={getusuarioTipoLabel(row.fk_id_tipo_usuario)}/>
                                  </TableCell>
              <TableCell align="center">{new Date (row.created_at).toLocaleString('pt-br')}</TableCell>
              <TableCell align="right">
              
                <ButtonGroup  >
                        <Button href={'/admin/usuario/editar/'+row.id_users} color="primary">Actualizar</Button>
                        <Button onClick={() => handleDelate(row.id_users)}  color="secondary">Excluir</Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
           ))}
        </TableBody>
      </Table>
    </TableContainer>
               </Grid>
            </Grid>
               </Paper> 
               </Grid> 
               </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}