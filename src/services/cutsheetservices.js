import React, { useEffect, useState } from 'react'
import api from './api'



const KEYS = {
  users: "users",
  employeesId: "employeesId"
}
export const getTipoPecaCollection = () => (
  [
    { id: '1', tittle: "School Shet" },
    { id: '2', tittle: "School Trouser" },
    { id: '3', tittle: "Fashion Shet" },
    { id: '4', tittle: "Elastic Trouser" },
    { id: '5', tittle: "Glad Neack Sheat" }
  ]
)
export async function insertemployees(data) {

  const data1 = {
    nome: data.nome,
    genero: data.genero,
    nr_bi: data.nr_bi,
    nr_nui: data.nr_nui,
    nome_bairro: data.nome_bairro,
    quarteirao_nr: data.quarteirao_nr,
    casa_nr: data.casa_nr,
    nr_telefone: data.nr_telefone,
    data_nascimento: data.data_nascimento
  }
  try {
    const response = await api.post('cutsheet/registar_cutsheet', data1);

    if (response.status == 200) {
      alert('Usuario ' + data1.email + ' Registrado com sucesso');
    } else if (response.status == 400) {
      alert(`Erro ao Cadastrar Usuario`);
    }
  } catch (error) {
    alert(`Erro de Cadastrar ` + error);
  }
}


export function GetcutsheetCollection() {
  const [cutsheet, setcutsheet] = useState([]); //vindo da BD 
  useEffect(() => {
    async function loadcutsheet() {
      const res = await api.post('cutsheet/listar_cutsheet');
      setcutsheet(res.data)
    }
    loadcutsheet();
  }, [])
  //alert(cutsheet)
  if (!cutsheet) {
    return (
      cutsheet.map(item => (
        { "id": item.pk_id_cutsheet, "tittle": item.codigo_cutsheet }
      ))

    )
  }



}

export function GetRecolhaByCutsheCollection(fk_id_cutsheet) {
  const [cutsheet, setcutsheet] = useState([]); //vindo da BD 
  useEffect(() => {
    async function loadcutsheet() {
      const res = await api.post('cutsheet/listar_cutsheetByRecoha', fk_id_cutsheet);
      setcutsheet(res.data)
      console.log(res)
    }
    loadcutsheet();
  }, [])


  if (!cutsheet) {
    return (
      cutsheet.map(item => (
        { "id": item.pk_id_cutsheet, "tittle": item.codigo_cutsheet }
      ))

    )
  }



}

export async function updatecutsheet(data) {
  const data1 = {
    id_cutsheet: data.id_cutsheet,
    nome: data.nome,
    genero: data.genero,
    nr_bi: data.nr_bi,
    nr_nui: data.nr_nui,
    nome_bairro: data.nome_bairro,
    quarteirao_nr: data.quarteirao_nr,
    casa_nr: data.casa_nr,
    nr_telefone: data.nr_telefone,
    data_nascimento: data.data_nascimento
  }
  try {
    const response = await api.post('cutsheet/editarcutsheetByID', data1);
    if (response.status == 200) {

      alert(`Regsitro Efectuado Com Sucesso`);
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
      const result = await api.post('/cutsheet/deletecutsheetByID/' + item.id_cutsheet);
      if (result.status == 204) {
        alert('Excluido Com Sucesso')
        console.log(result)
        window.location.href = '/admin/usuario/cutsheetMoztex'
      } else if (result.status != 204) {
        alert('Ocorreu Um Erro')
      }
    } catch (error) {
      alert('Erro Ao Excluir ' + error)
    }


  }
}


export function GetCutsheByFkCsCollection(pk_id_cutsheet) {
  const [codigo, setcodigo] = useState([]);
  alert("PK_id_stock:" + pk_id_cutsheet)
  let codigo1
  let res = api.post('cutsheet/listar_cutsheetByID', { pk_id_cutsheet }).then(res => {

    codigo1 = res.data.codigo_cutsheet
    codigo = codigo1
    setcodigo(codigo1)
  });
  if (!codigo) {
    return codigo
  }

}


export function GetAllEmployees() {
  const [cutsheet, setcutsheet] = useState([]); //vindo da BD 
  useEffect(() => {
    async function loadcutsheet() {
      const res = await api.post('cutsheet/listar_cutsheet');
      setcutsheet(res.data)
      console.log(res)
    }
    loadcutsheet();
  }, [])
  //alert(cutsheet)
  if (!cutsheet) {
    return (
      cutsheet.map(item => (
        cutsheet
      ))

    )
  }





}