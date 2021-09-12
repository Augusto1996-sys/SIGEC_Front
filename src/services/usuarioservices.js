import React, {useEffect, useState} from'react'
import api from './api'

const KEYS = {
  users: "users",
  usuarioId: "usuarioId"
}
export  function GetusuarioCollection() {
  const [usuario, setusuario] = useState([]); //vindo da BD 

  useEffect(() => {
    async function loadusuario() {
        const res = await api.post('funcionario/Listar_funcionario');
        setusuario(res.data)
    }
    loadusuario();
}, [])

  return (
   
      usuario.map(item =>(
        { "id": item.pk_id_funcionario, "tittle": item.nome_funcionario}
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

export const getSectorCollection = () => (
  [
    { id: '1', tittle: "Producao" },
    { id: '2', tittle: "Colagem" },
    { id: '3', tittle: "Corte" },
    { id: '4', tittle: "Armazem" },
    { id: '5', tittle: "Acabamento" }
  ]
)


export async function insertusuario(data) {

  const data1 = {
    pk_id_usuario: data.pk_id_usuario,
    email: data.email,
    password: data.password,
    isoque: data.isoque,
    state: data.state
  }
  try {
    const response = await api.post('/usuario/create', data1);

    if (response.status == 200) {
      alert('usuario ' + data1.email + ' Registrado com sucesso');
    } else if (response.status == 400) {
      alert(`Erro ao Cadastrar usuario`);
    }
  } catch (error) {
    alert(`Erro de Cadastrar ` + error);
  }
}


export async function updateusuario(data) {
  const data1 = {
    pk_id_usuario: data.pk_id_usuario,
    email: data.email,
    password: data.password,
    isoque: data.isoque,
    state: data.state
  }
  try {
    const response = await api.post('usuario/editarusuarioByID', data1);
    if (response.status == 200) {

      alert(`Dados Actualizados Com Sucesso`);
    } else if (response.status != 200) {
      alert(`Erro ao Actualizar  Usuario`);
    }
  } catch (error) {
    alert(`Erro na Actualizacao ` + error);
  }
}


export async function deleteUser(item) {
  if (window.confirm("Deseja Realmente Excluir " + item.nome + "? ")) {
    try {
      const result = await api.post('/usuario/deleteusuarioByID/' + item.pk_id_usuario);
      if (result.status == 204) {
        alert('Excluido Com Sucesso')
        console.log(result)
        window.location.href = '/admin/usuario/usuarioMoztex'
      } else if (result.status != 204) {
        alert('Ocorreu Um Erro')
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