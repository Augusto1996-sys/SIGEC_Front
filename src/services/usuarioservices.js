import React, { useEffect, useState } from 'react'
import api from './api'

const KEYS = {
  users: "users",
  usuarioId: "usuarioId"
}

export function GetcutsheetCollection() {
  const [cutsheet, setcutsheet] = useState([]); //vindo da BD 

  useEffect(() => {
    async function loadcutsheet() {
      const res = await api.get('cutsheet/listar_cutsheet');
      setcutsheet(res.data)

      console.log(res)
    }
    loadcutsheet();
  }, [])
  return (

    cutsheet.map(item => (
      { "id": item.pk_id_cutsheet, "tittle": item.codigo_cutsheet }
    ))

  )

}
export function GetusuarioCollection() {
  const [usuario, setusuario] = useState([]); //vindo da BD 

  useEffect(() => {
    async function loadusuario() {
      const res = await api.get('operario/Listar_operario');
      setusuario(res.data)

    }
    loadusuario();
  }, [])
  return (

    usuario.map(item => (
      { "id": item.pk_id_operario , "tittle": item.nome_operario }
    ))

  )

}

export const getNrLinhaCollection = () => (
  [
    { id: '1', tittle: "Linha 1" },
    { id: '2', tittle: "Linha 2" },
    { id: '3', tittle: "Linha 3" },
    { id: '4', tittle: "Linha 4" },
    { id: '1', tittle: "Linha 5" },
    { id: '2', tittle: "Linha 6" },
    { id: '3', tittle: "Linha 7" },
    { id: '4', tittle: "Linha 8" },
    { id: '4', tittle: "Linha 9" },
    { id: '5', tittle: "Linha 10" }
  ]
)




export async function insertusuario(data) {
  const data1 = {
    fullname: data.fullname,
    email: data.email,
    password: data.password,
    nivel: data.nivel,
    state: data.state
  }

  try {
    const response = await api.post('usuario/create', data1);
  
      if (response.status == 200) {
        alert('Excluido Com Sucesso ')
        window.location.href = '/admin/usuario/usuarioMoztex'
      } else if (response.status != 200) {
        alert('Usuario NAo Excluido')
      }
    } catch (error) {
      alert('Erro Ao Excluir ' + error)
    }

}


export async function updateusuario(data) {

  const data1 = {
    pk_id_usuarioc: data.pk_id_usuarioc,
    fullname: data.fullname,
    email: data.email,
    password: data.password,
    nivel: data.nivel,
    state: data.state
  }
  try {
    const response = await api.post('usuario/editarusuarioByID', data1);
    if (response.status == 200) {
      alert(`Dados Actualizados Com Sucesso`);
    } else if (response.status != 200) {
      alert(`Dados Actualizados Nao Cadastrados`);
    }
  } catch (error) {
    alert(`Erro ao Actualizados`);
  }

}


export async function deleteUser(item) {
  if (window.confirm("Deseja Realmente Excluir " + item.fullname + "? ")) {
    try {
      const result = await api.post('/usuario/deleteusuarioByID/' + item.pk_id_usuarioc);

      if (result.status == 200) {
        alert('Excluido Com Sucesso ')
        window.location.href = '/admin/usuario/usuarioMoztex'
      } else if (result.status != 200) {
        alert('Usuario NAo Excluido')
      }
    } catch (error) {
      alert('Erro Ao Excluir ' + error)
    }


  }
}

export function generateusuarioId() {
  if (localStorage.getItem(KEYS.usuarioId) == null) {
    localStorage.setItem(KEYS.usuarioId, '0')
  }
  var id = parseInt(localStorage.getItem(KEYS.usuarioId))
  localStorage.setItem(KEYS.usuarioId, (++id).toString())
  return id;
}

export async function getAllusuario() {



}