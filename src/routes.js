import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/admin/dashboard';
import Aluno from './pages/admin/dashboard/alunos';
import AlunoEditrar from './pages/admin/usuarios/usuario.editar';
import AlunoCadastrar from './pages/admin/usuarios/usuario.cadastrar';
import Login from './pages/admin/login'

import Usuario from './pages/admin/usuarios';
import UsuarioEditrar from './pages/admin/usuarios/usuario.editar';
import UsuarioCadastrar from './pages/admin/usuarios/usuario.cadastrar';
import moztex from './pages/Recolha/moztex';
import userMoztex from './pages/User/userIndex';

import cutsheetMoztex from './pages/Cutsheet/cutsheetIndex';
import usuarioMoztex from './pages/Usuario/usuarioIndex'
import funcionarioMoztex from './pages/Funcionario/funcionarioIndex'

import AlunoDetails from './pages/client/alunos/alunos.details';

import PrivateRoute from './services/wAuth'

export default function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <PrivateRoute path="/aluno/:idaluno" exact component={AlunoDetails} />


                <PrivateRoute path="/admin" exact component={Dashboard} />
                <Route path="/admin/login" exact component={Login} />

                <PrivateRoute path="/admin/aluno" exact component={Aluno} />
                <PrivateRoute path="/admin/aluno/cadastrar" exact component={AlunoCadastrar} />
                <PrivateRoute path="/admin/aluno/editar/:idaluno" exact component={AlunoEditrar} />
                

                <Route path="/admin/usuario" exact component={Usuario} />
                <Route path="/admin/usuario/moztex" exact component={moztex} />
                <Route path="/admin/usuario/userMoztex" exact component={userMoztex} />
                <Route path="/admin/usuario/usuarioMoztex" exact component={usuarioMoztex} />
                <Route path="/admin/usuario/funcionarioMoztex" exact component={funcionarioMoztex} />
                <Route path="/admin/usuario/cutsheetMoztex" exact component={cutsheetMoztex} />
                <Route path="/admin/usuario/cadastrar" exact component={UsuarioCadastrar} />
                <PrivateRoute path="/admin/usuario/editar/:idUsuario" exact component={UsuarioEditrar} />

            </Switch>

        </BrowserRouter>
    )
}