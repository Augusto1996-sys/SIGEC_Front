import React, {useState, useEffect}from 'react';
import {Link, useHistory, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../components/menu-admin'
import Footer from '../../components/footer-admin';
import Button from '@material-ui/core/Button';
import api from '../../services/api'
import User from './User'



const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
 
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(4),paddingBottom: theme.spacing(4),},
  paper: {padding: 15,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  formControl:{width:'100%'}
}));

export default function EditarUsuario() {
  const classes = useStyles();
  const [email, setEmail] =useState('');
  const [tipouser, setTipouser] =useState('');
  const [password, setPassword] =useState('');
  const [confpassword, setConfpassword] =useState('');   
  const histry =  useHistory();

const {idUsuario} = useParams();


  useEffect(()=> {
    async function getUsuario(){
          const response = await api.get('/user/listUsuarioByID/'+idUsuario)
          setEmail(response.data.email);
          setTipouser(response.data.fk_id_tipo_usuario);
          setPassword(response.data.password);
    }

    getUsuario();
  }, [])

 async function handleSibmit(){
  const data = {
    id_users:idUsuario,
    fk_id_tipo_usuario:tipouser,
    email:email, 
    password:password
  }

  if(tipouser!=''&&email!=''&&password!='') {
    const response = await api.post('user/editarUsuarioByID', data);
            if (response.status == 200){
              console.log(response)
              window.location.href ='/admin/usuario'
                }else if(response != 200){
                  alert(`Erro ao Actualizar  Usuario`);
                }
        }else{
          
              alert(`Por Favor Preencha todos os campos `+data.email);

        }
    }
    
  return (
    <div className={classes.root}> 
     
      <MenuAdmin title={'Produto'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          <Grid item  sm={12}>
              <Paper className ={classes.paper}>
                           
               </Paper> 
               </Grid>
               </Grid>

               <User />

          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}