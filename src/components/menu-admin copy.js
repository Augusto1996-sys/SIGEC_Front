import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { mainListItems, secondaryListItems } from './list-menu-admin';
import {getNomeUsuario} from '../services/auth';
import logosistema from '../assets/img/moztex.jpg'


import {Grid,InputBase,Badge,} from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {withStyles} from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';


import { getToken, logout } from '../services/auth';

import api from "../services/api"


const useStyle = makeStyles(theme =>({
    //Atribuind a cor da barra de Menu
  
    root:{
        backgroundColor:'#fff',
    },
    searchInput:{
        opacity:'o.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        '&:hover':{
            backgroundColor: '#f2f2f2'

        },
        //Marcando a distancia entre o texto e o butao de search
        '& .MuiSvgIcon-root':{
            marginRight: theme.spacing(1) //o theme e uma funcao js 
        }
    },
    // classes={{root:classes.btnRoot, label:classes.btnLabel}} mudando o beckground da label e do butao
    btnRoot:{
        backgroundColor: 'green'

    },
        btnLabel:{
            backgroundColor: 'red'

        }
}))

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
   
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    fixedHeight: {
      height: 240,
    },
  }));
export default function MenuAdmin({title}){
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return(
        <>
         <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <AppBar position="static" className={classes.root} >
            <Toolbar>
                        
                <Grid container alignItems="center">
                    <Grid item >
                        <InputBase style={{left:'0px'}}
                        placeholder="Search Topic"
                        className={classes.searchInput}
                        value={getNomeUsuario}
                        startAdornment={
                            <SearchIcon fontSize="small"/>
                        }
                        />
                    </Grid>
                    <Grid item sm>
                    </Grid>
                    <Grid item >
                        <IconButton > 
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsNoneIcon fontSize="small"/>
                            </Badge>
                        </IconButton >

                        <IconButton >
                            <Badge badgeContent={3} color="secondary">                                    
                                <ChatBubbleOutlineIcon fontSize="small"/> 
                            </Badge>                     
                        </IconButton>

                        <IconButton onClick={confirmLogout}>
                        <PowerSettingsNewIcon fontSize="small"/>
                        </IconButton>
                        <IconButton>
                        <Avatar 
                            alt='src'
                            variant='circular'
                            src={logosistema}>
                        </Avatar>
                        </IconButton>
                        {getNomeUsuario()}
                        
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>
      </AppBar>
        <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <img style={{width:160, height:60}} src={logosistema} alt="logo sistema"/>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List> {mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      </>
    )
}


async function confirmLogout(){
  if(window.confirm("Deseja Sair do Sistema")){
      const res = await api.get('/user/destroyToken', {headers:{token:getToken()}});
      if(res.status == 200){
        logout();
        window.location.href = '/admin/login';
      }else{
        alert("Nao Foi Possivel Terminar a Sua Sessao")
      }
  }

}



