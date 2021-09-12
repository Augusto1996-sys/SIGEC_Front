import React, {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../components/menu-admin'
import Footer from '../../components/footer-admin';
import Usuario from './Requisicao'



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

               <Usuario />

          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}