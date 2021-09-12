import React, {useState}from 'react';
import {Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin'
import Footer from '../../../components/footer-admin';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import api from '../../../services/api';


const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(4),paddingBottom: theme.spacing(4),},
  paper: {padding: 15,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  formControl:{width:'100%'}}));

export default function UsuarioCadastrar() {
  const classes = useStyles();
  const [email, setEmail] =useState('');
  const [tipouser, setTipouser] =useState('');
  const [password, setPassword] =useState('');
  const [confpassword, setConfpassword] =useState('');   
  const histry =  useHistory();

 async function handleSibmit(){
    const data = {
      fk_id_tipo_usuario:tipouser,
      email:email, 
      password:password
    }


    if(tipouser!=''&&email!=''&&password!=''){
      
      const response = await api.post('user/create', data);
    
            if (response.status == 200){
              histry.push('/admin/usuario');
                }else if(response != 200){
                  alert(`Erro ao Cadastrar Usuario`);
                }
            
            
          }else{
            alert(`Por Favor Preencha todos os campos`);
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
                
          <h2>Cadastro de Usuarios</h2>
              <Grid container spacing={3}>
                
                <Grid item xs={12} sm={12}>
                    
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="Digita o seu Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formControl}>
                      <InputLabel id="labelTipo">Tipo Usuario</InputLabel>
                      <Select
                        labelId="labelTipo"
                        id="tipouser"
                       value={tipouser}
                       onChange={e => setTipouser(e.target.value)}
                      >
                        <MenuItem value={''}>None</MenuItem>
                        <MenuItem value={1}>Limpeza</MenuItem>
                        <MenuItem value={2}>Maquinista</MenuItem>
                        <MenuItem value={3}>Engomador</MenuItem>
                        <MenuItem value={4}>Recolha</MenuItem>
                        <MenuItem value={5}>Fiel Armazem</MenuItem>
                        <MenuItem value={6}>Administracao</MenuItem>
                        <MenuItem value={7}>RH</MenuItem>
                        <MenuItem value={8}>Chefe Producao</MenuItem>                        
                        <MenuItem value={9}>Gordenador</MenuItem>
                        <MenuItem value={10}>Director Geral</MenuItem>                        
                        <MenuItem value={11}>Administrador</MenuItem>
                      </Select>
                 </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField 
                  required
                  type="password"
                  id="password"
                  name="password"
                  label="Senha"
                  fullWidth
                  autoComplete="Senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                  required
                  type="password"
                  id="confpassword"
                  name="confpassword"
                  label="Confirmar Senha"
                  fullWidth
                  autoComplete="Confirmar Senha"
                  value={confpassword}
                  onChange={e => setConfpassword(e.target.value)}
                />
            </Grid>
              <Grid item xs={12} sm={12}>
                <Button variant="contained" onClick={handleSibmit} color="primary">
                Salvar Usuario
                </Button>
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