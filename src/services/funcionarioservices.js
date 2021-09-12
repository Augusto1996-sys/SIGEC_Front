import api from './api'


const KEYS = {
  users: "users",
  employeesId: "employeesId"
}
export const getNrLinhaCollection = () => (
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

export async function insertFuncionario(data) {
  const data1 = {

    nome_operario: data.nome_operario,
    nr_bi: data.nr_bi,
    nr_nui: data.nr_nui,
    nome_bairro: data.nome_bairro,
    quarteirao_nr: data.quarteirao_nr,
    genero: data.genero,
    casa_nr: data.casa_nr,
    nr_telefone: data.nr_telefone,
    nr_operario: data.nr_operario


  }
  try {
    const response = await api.post('operario/registar_operario', data1);

    if (response.status == 200) {
      alert('Usuario ' + data1.nome_operario + ' Registrado com sucesso');
    } else if (response.status == 400) {
      alert(`Erro ao Cadastrar Usuario`);
    }
  } catch (error) {
    alert(`Erro de Cadastrar ` + error);
  }
}


export async function updateFuncionario(data) {
  const data1 = {
    pk_id_operario: data.pk_id_operario,
    nome_operario: data.nome_operario,
    nr_bi: data.nr_bi,
    nr_nui: data.nr_nui,
    nome_bairro: data.nome_bairro,
    quarteirao_nr: data.quarteirao_nr,
    data_nascimento: data.data_nascimento,
    genero: data.genero,
    casa_nr: data.casa_nr,
    nr_telefone: data.nr_telefone,
    nr_operario: data.nr_operario

  }
  try {
    const response = await api.post('operario/editaroperarioByID', data1);
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
  if (window.confirm("Deseja Realmente Excluir " + item.nome_operario + "? ")) {
    try {
      const result = await api.post('/operario/deleteoperarioByID/' + item.pk_id_operario);
      if (result.status == 200) {
        alert('Funcionario Excluido Com Sucesso')
        console.log(result)
        window.location.href = '/admin/usuario/funcionarioMoztex'
      } else if (result.status == 400) {
        alert('Funcionario Nao Deletado')
      }
    } catch (error) {
      alert('Erro Ao Excluir ' + error)
    }
  }
}
