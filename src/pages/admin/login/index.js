import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import logosistema from '../../../assets/img/moztex.jpg'
import CircularProgress from '@material-ui/core/CircularProgress';

import Footer from '../../../components/footer-admin';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../../../services/api';

import {setIdUsuario, login, setNomeUsuario, setTipoUsuario,setUsuario, TUSER_Axn} from '../../../services/auth'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {marginTop: theme.spacing(8),display: 'flex',flexDirection: 'column',alignItems: 'center',},
  //avatar: {margin: theme.spacing(1),backgroundColor: theme.palette.secondary.main,  },
  form: {width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),  },
  submit: {margin: theme.spacing(3, 0, 2),},}));

export default function SignIn() {
  const classes = useStyles();
  const [email_login, setEmail] = useState('');  
  const [password_login, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  
  async function handleSubmit(){
     
    await api.post('/usuario/login_users/', {email_login,password_login})
              .then(res =>{
                console.log(res)
                if(res.status == 200){
                    if(res.data.status == 1){
                        login(res.data.token);
                        setIdUsuario(res.data.id_users);
                        setNomeUsuario(res.data.email);
                        setTipoUsuario(res.data.fk_id_tipo_usuario)                        
                        setUsuario(res.data)
                        
                        
                    window.location.href = '/admin'
                    }else if(email_login == ''||password_login == ''){
                      alert('Atencao: Preencha todos os espacos')
                  }else if(res.data.status == 2){
                        alert('Atencao: '+res.data.error)
                    }
                    setLoading(false);
                }else{
                  alert('Erro no servidor');
                  setLoading(false);
                }
              })
  }

  function loadSubmit(){
    setLoading(true);
    setTimeout(
        () => handleSubmit(),
        3000
    );
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{paddingTop:'120px',
                    width:'300px',
                   }}>
        <Avatar 
            alt='src'
            variant='zzzzzzzzzzzzzzzzz'
            style={{
                    width:'300px',
                   }}
            src={logosistema}>
          <LockOutlinedIcon />
        </Avatar>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Tape Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email_login}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Tape Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password_login}
            onChange={e => setPassword(e.target.value)}
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loadSubmit}
            disabled ={loading}
          >
           {loading? <CircularProgress />: "Login"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">

              </Link>
            </Grid>
            <Grid item>
              <Link href="usuario/cadastrar" variant="body2">
                {"I don't have an acount, Sigin?"}
              </Link>
            </Grid>
          </Grid>
      </div>
      <Box mt={8}>
      <Footer />
      </Box>
    </Container>
  );
}
