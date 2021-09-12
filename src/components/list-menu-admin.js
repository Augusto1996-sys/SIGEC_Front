import React from 'react';
import api from "../services/api"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/People';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/LocalBar';
import UsersIcon from '@material-ui/icons/DeckRounded';
import ExitToApp from '@material-ui/icons/Power';
import { getToken, logout } from '../services/auth';
import { makeStyles } from '@material-ui/core/styles';
import { GridList } from '@material-ui/core';

export const mainListItems = (

  <div >
    <ListItem button component="a" href="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button component="a" href="/admin/usuario/usuarioMoztex">
      <ListItemIcon>
        <UsersIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItem>

    <ListItem button component="a" href="/admin/usuario/funcionarioMoztex">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Funcionario" />
    </ListItem>

    
    <ListItem button component="a" href="/admin/usuario/cutsheetMoztex">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Cutsheet" />
    </ListItem>

    <ListItem button component="a" href="/admin/aluno">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Request" />
    </ListItem>

    <ListItem button >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>

      <ListItemText primary="Received" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Configurations </ListSubheader>
    <ListItem button onClick={confirmLogout}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);

async function confirmLogout() {
  if (window.confirm("Deseja Sair do Sistema")) {
    const res = await api.get('/user/destroyToken', { headers: { token: getToken() } });
    if (res.status == 200) {
      logout();
      window.location.href = '/admin/login';
    } else {
      alert("Nao Foi Possivel Terminar a Sua Sessao")
    }
  }

}
