import React, { useEffect, useState } from 'react'
import api from './api'


const KEYS = {
  users: "users",
  employeesId: "employeesId"
}

export function GetnrNomeRoloCollection() {

  const [cutsheet, setcutsheet] = useState([]); //vindo da BD 

  useEffect(() => {
    async function loadcutsheet() {
      const res = await api.post('stock/listar_stock');
      setcutsheet(res.data)
      console.log(res)
    }
    loadcutsheet();
  }, [])
  return (
    cutsheet.map(item => (
      { "id": item.nome, "tittle": item.nome }
    ))

  )


}


export const getnrTamanhoZipperCollection = () => (
  [
    { id: '12', tittle: "9" },
    { id: '13', tittle: "10" },
    { id: '14', tittle: "11" },
    { id: '15', tittle: "12" },
    { id: '16', tittle: "13" },
    { id: '8', tittle: "14" },
    { id: '18', tittle: "15" },
    { id: '19', tittle: "16" },
    { id: '20', tittle: "17" },
    { id: '21', tittle: "18" }
  ]
)

export const getnrTamanhoEtiquetaCollection = () => (
  [
    { id: '27', tittle: "4" },
    { id: '2', tittle: "5/6" },
    { id: '3', tittle: "6/7" },
    { id: '4', tittle: "7/8" },
    { id: '5', tittle: "8/9" },
    { id: '6', tittle: "9/10" },
    { id: '7', tittle: "11" },
    { id: '8', tittle: "12" },
    { id: '9', tittle: "13" },
    { id: '10', tittle: "14" },
    { id: '38', tittle: "14.5" },
    { id: '12', tittle: "15" },
    { id: '39', tittle: "15.5" },
    { id: '14', tittle: "16" },
    { id: '40', tittle: "16.5" },
    { id: '16', tittle: "17" },
    { id: '41', tittle: "17.5" }
  ]
)

export const getnrTamanhoButaoCollection = () => (
  [
    { id: '46', tittle: "9" },
    { id: '47', tittle: "11.5" }
  ]
)



export const getIntertelaCalsaCollection = () => (
  [
    { id: '10', tittle: "0338" },
    { id: '11', tittle: "338" }
  ]
)

export const getZipperCorCollection = () => (
  [
    { id: 'Grey', tittle: "Grey" },
    { id: 'Ligth Grey', tittle: "Ligth Grey" },
    { id: 'Navy', tittle: "Navy" }
  ]
)


export const getEtiquetaCorCollection = () => (
  [
    { id: 'White', tittle: "White" },
    { id: 'Blue', tittle: "Blue" },
    { id: 'Red', tittle: "Red" }
  ]
)



export const getCorEtiquetaCollection = () => (
  [
    { id: 'White', tittle: "White" },
    { id: 'Navy', tittle: "Navy" },
    { id: 'Blue', tittle: "Blue" }
  ]
)
export const getCorButaoFashionCollection = () => (
  [
    { id: 'White', tittle: "White" },
    { id: 'Navy', tittle: "Navy" },
    { id: 'Blue', tittle: "Blue" },
    { id: 'Black', tittle: "Black" }
  ]
)

export const getCorLinhaCollection = () => (
  [
    { id: 'White', tittle: "White" },
    { id: 'Navy', tittle: "Navy" },
    { id: 'Blue', tittle: "Blue" },
    { id: 'Black', tittle: "Black" },

    { id: 'Grey', tittle: "Grey" },
    { id: 'Ligth Grey', tittle: "Ligth Grey" },
    { id: 'School Grey', tittle: "School Grey" },
    { id: 'B. Pink', tittle: "B. Pink" }
  ]
)

export const getCorButaoCalsaCollection = () => (
  [

    { id: 'Grey', tittle: "Grey" },
    { id: 'Navy', tittle: "Navy" },
    { id: 'Black', tittle: "Black" }
  ]
)
export const getcorIntertelaBolso = () => (
  [

    { id: 'White', tittle: "White" },
    { id: 'Creme', tittle: "Creme" }
  ]
)
export const getTipoFimZipperCollection = () => (
  [

    { id: 'Calca', tittle: "Calca" },
  ]
)
export const getTipoFimEtiquetaCollection = () => (
  [

    { id: 'Calca', tittle: "Calca" },
    { id: 'Camisa', tittle: "Camisa" },
  ]
)
export const getCorRoloIntertelaCamisaCollection = () => (
  [
    { id: 'White', tittle: "White" },
  ]
)
export const getCorRoloIntertelaCalsaCollection = () => (
  [
    { id: 'Cinzento', tittle: "Cinzento" },
  ]
)
export const getCorRoloCollection = () => (
  [
    { id: 'White', tittle: "White" },
    { id: 'Ligth Grey', tittle: "Ligth Grey" },
    { id: 'School Grey', tittle: "School Grey" },

    { id: 'Meed Blue', tittle: "Meed Blue" },
    { id: 'Zimfadel', tittle: "Zimfadel" },
    { id: 'Bargande', tittle: "Bargande" },
  ]
)

//Refrencias de Todos os Produtos
export const getReferenciaEtiquetaCalsaCollection = () => (
  [
    { id: '28', tittle: 'Student Prince PEP Viscoso' },
    { id: '31', tittle: 'Top Class Viscoso' },
    { id: '33', tittle: 'mrp Viscoso' },
    { id: '34', tittle: '1965 PEP Viscoso' },
  ]
)
export const getReferenciaEtiquetaCamisaCollection = () => (
  [
    { id: '27', tittle: '1965 PEP Cotton' },
    { id: '29', tittle: 'Top Class Cutton' },
    { id: '30', tittle: 'Student Prince PEP Cutton' },
    { id: '32', tittle: 'mrp Cutton' },
  ]
)
export const getReferenciaButaoCamisaCollection = () => (
  [
    { id: '5', tittle: 'Express' },
    { id: '6', tittle: 'Humbra' },
    { id: '7', tittle: 'Fashion' }
  ]
)

export const getSemReferenciaCollection = () => (
  [
    { id: '1', tittle: 'Sem Refrencia' }
  ]
)


export function GetcutsheetCollection(nome) {
  const [cutsheet, setcutsheet] = useState([]); //vindo da BD 

  useEffect(() => {
    async function loadcutsheet() {
      const res = await api.post('cutsheet/listar_cutsheetByRecoha', nome);
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


export async function insertrolo(data) {

  /*alert(
  "Recolha "+data.recolha+" "+
  "Stock "+data.pk_id_stock+" "+
  "Cutsheet "+data.fk_id_cutsheet+" "+
  "Quantidade "+data.quantidade +" "+
  "Quantidade Recebida"+data.quantidadeReuic
  )*/
  const data1 = {
    recolha: data.recolha,
    pk_id_stock: data.pk_id_stock,
    quantidade_req: data.quantidadeReuic
  }
  try {
    const response = await api.post('requisicao/registar_requisicao', data1);

    if (response.status == 200) {
      alert('Usuario ' + data1.quantidadeReuic + ' Registrado com sucesso');
    } else if (response.status == 400) {
      alert(`Erro ao Cadastrar Usuario`);
    }
  } catch (error) {
    alert(`Erro de Cadastrar ` + error);
  }
}


export async function updaterolo(data) {
  const data1 = {
    recolha: data.recolha,
    fk_id_stock: data.fk_id_stock,
    quantidade: data.quantidade,
    fk_id_estado_requisicao: data.fk_id_estado_requisicao,
    fk_id_cutsheet: data.fk_id_cutsheet,
    fk_id_referencia: data.fk_id_referencia,
    fk_id_tamanho: data.fk_id_tamanho,
    nome: data.nome,
    cor_material: data.cor_material

  }



  try {
    const response = await api.post('/requisicao/registar_requisicao', data1);
    if (response.status == 200) {

      alert(`Regsitro Efectuado Com Sucesso`);
    } else if (response.status != 200) {
      alert(`Erro ao Actualizar  cutsheet`);
    }
  } catch (error) {
    alert(`Erro na Actualizacao ` + error);
  }
}


export async function deleteUser(item) {
  if (window.confirm("Deseja Realmente Excluir " + item.nome_rolo + "? ")) {
    try {
      const result = await api.post('/rolo/deleteroloByID/' + item.pk_id_material);
      if (result.status == 204) {
        alert('rolo Excluido Com Sucesso')
        console.log(result)
        window.location.href = '/admin/cutsheet/roloMoztex'
      } else if (result.status != 204) {
        alert('Ocorreu Um Erro')
      }
    } catch (error) {
      alert('Erro Ao Excluir ' + error)
    }


  }
}

export function generateEmployeesId() {
  if (localStorage.getItem(KEYS.employeesId) == null) {
    localStorage.setItem(KEYS.employeesId, '0')
  }
  var id = parseInt(localStorage.getItem(KEYS.employeesId))
  localStorage.setItem(KEYS.employeesId, (++id).toString())
  return id;
}

export function getAllEmployees() {
  if (localStorage.getItem(KEYS.users) == null) {
    localStorage.setItem(KEYS.users, JSON.stringify([]))
  } else
    return JSON.parse(localStorage.getItem(KEYS.users))


}