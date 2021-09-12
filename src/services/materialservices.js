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
    fk_id_cutsheet: data.fk_id_cutsheet,
    nome: data.nome,
    qty_recebida: data.qty_recebida,
    qty_erequisitada: data.qty_erequisitada,
    qty_remanascente: data.qty_remanascente
  }
  try {
    const response = await api.post('stock/registar_stock', data1);

    if (response.status == 200) {
      alert('Usuario ' + data1.nome + ' Registrado com sucesso');
    } else if (response.status == 400) {
      alert(`Erro ao Cadastrar Usuario`);
    }
  } catch (error) {
    alert(`Erro de Cadastrar `+error);
  }
}


export async function updatecutsheet(data) {
  const data1 = {
    fk_id_cutsheet: data.fk_id_cutsheet,
    nome: data.nome,
    qty_recebida: data.qty_recebida,
    qty_erequisitada: data.qty_erequisitada,
    qty_remanascente: data.qty_remanascente
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