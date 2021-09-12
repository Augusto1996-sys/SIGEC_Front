import React, { useEffect, useState } from 'react'
import api from './api'


const KEYS = {
  users: "users",
  employeesId: "employeesId"
}
export const getnrLinhaCollection = () => (
  [
    { id: '14', tittle: "Armazem" },
    { id: '11', tittle: "Colagem" },
    { id: '12', tittle: "Corte" },
    { id: '13', tittle: "Acabamento" },
    { id: '1', tittle: "Linha 1" },
    { id: '2', tittle: "Linha 2" },
    { id: '3', tittle: "Linha 3" },
    { id: '4', tittle: "Linha 4" },
    { id: '5', tittle: "Linha 5" },
    { id: '6', tittle: "Linha 6" },
    { id: '7', tittle: "Linha 7" },
    { id: '8', tittle: "Linha 8" },
    { id: '9', tittle: "Linha 9" },
    { id: '10', tittle: "Linha 10" },
  ]
)
export const getnrNomeRoloCollection = () => (
  [
    { id: 'Tecido Calsa', tittle: "Tecido Para Calsa" },
    { id: 'Tecido Camisa', tittle: "Tecido Para Camisa" },
    { id: 'Intertela Calsa', tittle: "Intertela Para Calsa" },    
    { id: 'Intertela Camisa', tittle: "Intertela Para Camisa" },
    { id: 'Bolso', tittle: "Bolso" }
  ]
)

export const getnrShadeRoloCollection = () => (
  [
    { id: 'No Shade', tittle: "NAo Leva Shade" },
    { id: 'A', tittle: "A" },
    { id: 'B', tittle: "B" },
    { id: 'C', tittle: "C" }
  ]
)

export const getnrReferenciaTecidoCalsaCollection = () => (
  [
    { id: '12', tittle: "9293" },
    { id: '13', tittle: "9251" },
    { id: '14', tittle: "9279" },
    { id: '15', tittle: "9177" },
    { id: '16', tittle: "9178" },
    { id: '18', tittle: "9194" },    
    { id: '19', tittle: "9195" }
  ]
)
export const getnrReferenciaTecidoCamisaCollection = () => (
  [
    { id: '6', tittle: "80/20 45x45 110x76" },
    { id: '7', tittle: "65/35 45x45 110x76" },
    { id: '8', tittle: "80/20 45x45 133x72" },    
    { id: '9', tittle: "65/35 45x45 133x72" }
  ]
)




export const getIntertelaCalsaCollection = () => (
  [
    { id: '10', tittle: "0338" },
    { id: '11', tittle: "338" }
  ]
)
export const getIntertelaCamisaCollection = () => (
  [
    { id: '2', tittle: "9750" },
    { id: '3', tittle: "80/20" },
    { id: '4', tittle: "5034" },    
    { id: '5', tittle: "3205" }
  ]
)

export const getBolsoCollection = () => (
  [
    { id: '26', tittle: "9256" },
    { id: '27', tittle: "9286" }
  ]
)


export const getCorRoloCamisaCollection = () => (
  [
    { id: 'White', tittle: "White" },
    { id: 'Navy', tittle: "Navy" },
    { id: 'School Blue', tittle: "School Blue" },

    { id: 'Meed Blue', tittle: "Meed Blue" },
    { id: 'Zimfadel', tittle: "Zimfadel" },
    { id: 'Bargande', tittle: "Bargande" },
  ]
)
export const getcorIntertelaBolso = () => (
  [
    
    { id: 'White', tittle: "White" },
    { id: 'Creme', tittle: " Creme" }
  ]
)
export const getCorRoloCalsaCollection = () => (
  [
    
    { id: 'Ligth Grey', tittle: "Ligth Grey" },
    { id: 'Grey', tittle: "Ligth Grey" },
    { id: 'School Grey', tittle: "School Grey" }
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

export function GetcutsheetCollection() {
  const [cutsheet, setcutsheet] = useState([]); //vindo da BD 

  useEffect(() => {
    async function loadcutsheet() {
      const res = await api.post('cutsheet/listar_cutsheet');
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

  const data1 = {

    fk_id_referencia: data.fk_id_referencia,
    fk_id_cutsheet: data.fk_id_cutsheet,
    nome: data.nome,
    cor: data.cor,
    shade: data.shade,
    invoice_nr: data.invoice_nr,
    metragem: data.metragem,
    bale_number: data.bale_number,
    estado_rolo: data.estado_rolo,
    


  }
  try {
    const response = await api.post('rolo/registar_rolo', data1);

    if (response.status == 200) {
      alert('cutsheet ' + data1.nome + ' Registrado com sucesso');
    } else if (response.status == 400) {
      alert(`Erro ao Cadastrar cutsheet`);
    }
  } catch (error) {
    alert(`Erro de Cadastrar ` + error);
  }
}


export async function updaterolo(data) {
  const data1 = {
    pk_id_material: data.pk_id_material,
    fk_id_referencia: data.fk_id_referencia,
    fk_id_cutsheet: data.fk_id_cutsheet,
    nome: data.nome,
    cor: data.cor,
    shade: data.shade,
    invoice_nr: data.invoice_nr,
    metragem: data.metragem,
    bale_number: data.bale_number,
    estado_rolo: data.estado_rolo 

  }

  

  try {
    const response = await api.post('/rolo/actualizar_rolo', data1);
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
