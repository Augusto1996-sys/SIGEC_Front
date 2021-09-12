import React, { useEffect, useState } from 'react'
import api from './api'


const KEYS = {
  users: "users",
  employeesId: "employeesId"
}
export const getTipoPecaCollection = () => (
  [
    { id: 'L/S', tittle: "Long Sleave" },
    { id: 'Fashion', tittle: "Fashion Shet" },
    { id: 'S/S', tittle: "Short Sleave" },
    { id: 'G/N', tittle: "Glad Neack Sheat" }
  ]
)
export const getTipoEtiquetaCollection = () => (
  [
    { id: '15', tittle: "Student Prince PEP Cutton" },
    { id: '18', tittle: "Top Class Cutton" },
    { id: '20', tittle: "mrp Cutton" },
    {id:'', tittle: 'Pep 1965'}
  ]
)

export const getTipoTecidoCollection = () => (
  [
    //{ id: '1', tittle: "School Shet" },
    { id: '11', tittle: "80/20 45x45 110x76" },
    { id: '12', tittle: "65/35 45x45 110x76 " },
    { id: '13', tittle: "80/20 45x45 133x72" },    
    { id: '13', tittle: "65/35 45x45 133x72" },
    
    //{ id: '14', tittle: "9279" },
    //{ id: '5', tittle: "Glad Neack Sheat" }
  ]
)
export const getTipoIntertelaCollection = () => (
  [
    //{ id: '1', tittle: "School Shet" },
    { id: '3', tittle: "5034" },
    { id: '9', tittle: "0338" },
    { id: '10', tittle: "338" },
    
    //{ id: '14', tittle: "9279" },
    //{ id: '5', tittle: "Glad Neack Sheat" }
  ]
)

export const getTipoBolsoCollection = () => (
  [
    //{ id: '1', tittle: "School Shet" },
    { id: '0', tittle: "Bolso 1" },
    { id: '91', tittle: "Bolso 2" },
    { id: '100', tittle: "Bolso 3" },
    
    //{ id: '14', tittle: "9279" },
    //{ id: '5', tittle: "Glad Neack Sheat" }
  ]
)
export const getTipoBotaoCollection = () => (
  [
    //{ id: '1', tittle: "School Shet" },
    { id: '0', tittle: "Express" },
    { id: '91', tittle: "Humbra/Milagroso" },
    
    { id: '0', tittle: "Oackridge 9.5" },
    { id: '91', tittle: "Oackridge 11.5" },
    
    //{ id: '14', tittle: "9279" },
    //{ id: '5', tittle: "Glad Neack Sheat" }
  ]
)

export const getCorPecaCollection = () => (
  [
    
    { id: '1', tittle: "White" },
    { id: '2', tittle: "Blue" },
    { id: '1', tittle: "Bleack" },
    { id: '2', tittle: "Meed Blue" },    
    { id: '2', tittle: "Bargandi" },
    { id: '2', tittle: "Zimfadel" },    
    { id: '2', tittle: "Mangeta" },
  ]
)
export function GetcutsheetCamisasCollection(nome) {
  const [cutsheet, setcutsheet] = useState([]); //vindo da BD 

  useEffect(() => {
    async function loadcutsheet() {
      const res = await api.post('cutsheetCamisa/listar_cutsheetCamisa');
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
export async function insertcutsheetCamisa(data) {

  const data1 = {
    codigo_cutsheet: data.codigo_cutsheet,
    cod_tecido1: data.cod_tecido1,
    cod_tecido2: data.cod_tecido2,
    tipo_peca: data.tipo_peca,
    quantidade_peca: data.quantidade_peca,
    metragem_tecido: data.metragem_tecido,
    cod_intertela1: data.cod_intertela1,
    cod_intertela2: data.cod_intertela2,
    metragem_intertela: data.metragem_intertela,
    tipo_etiqueta: data.tipo_etiqueta,
    especifidade_peca: data.especifidade_peca,
    nr_cortes: data.nr_cortes,
    cor: data.cor,
    cod_cones: data.cod_cones
  }
  try {
    const response = await api.post('cutsheetCamisa/registar_cutsheetCamisa', data1);

    if (response.status == 200) {
      alert('Cutsheet Registrado com sucesso');
    } else if (response.status == 400) {
      alert(`Erro ao Cadastrar Usuario`);      
    }
  } catch (error) {
    alert(`Erro de Cadastrar `+error);
  }
}


export async function updatecutsheetCamisa(data) {
  const data1 = {
    pk_id_cutsheet:data.pk_id_cutsheet,
    codigo_cutsheet: data.codigo_cutsheet,
    cod_tecido1: data.cod_tecido1,
    cod_tecido2: data.cod_tecido2,
    tipo_peca: data.tipo_peca,
    quantidade_peca: data.quantidade_peca,
    metragem_tecido: data.metragem_tecido,
    cod_intertela1: data.cod_intertela1,
    cod_intertela2: data.cod_intertela2,
    metragem_intertela: data.metragem_intertela,
    tipo_etiqueta: data.tipo_etiqueta,
    especifidade_peca: data.especifidade_peca,
    nr_cortes: data.nr_cortes,
    cor: data.cor,
    cod_cones: data.cod_cones
  }
  try {
    const response = await api.post('cutsheet/editarcutsheetByID', data1);
    if (response.status == 200) {

      alert("Actualizacao de "+data1.codigo_cutsheet+" Efectuado Com Sucesso");
    } else if (response.status != 200) {
      alert("Cutsheet Nao Actualizar");
    }
  } catch (error) {
    alert("Erro na Actualizacao " + error);
  }
}


export async function deletecutsheetCamisa(item) {
  if (window.confirm("Deseja Realmente Excluir O Cutsheet " + item.codigo_cutsheet + "? ")) {
    try {
      const result = await api.post('/cutsheet/deletar_cutsheet/' + item.pk_id_cutsheet);
      if (result.status == 204) {
        alert('Cutsheet Excluido Com Sucesso ')       
        window.location.href = '/admin/usuario/cutsheetCamisamoztex' 
      } else if (result.status != 204) {
        alert('Ocorreu Um Erro')
      }
    } catch (error) {
      alert('Erro Ao Excluir ' + error)
    }


  }
}
