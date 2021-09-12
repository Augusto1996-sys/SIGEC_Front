import api from './api'


const KEYS = {
  users: "users",
  employeesId: "employeesId"
}

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
    const response = await api.post('pessoa/registar_pessoa', data1);

    if (response.status == 200) {
      alert('Usuario ' + data1.email + ' Registrado com sucesso');
    } else if (response.status == 400) {
      alert(`Erro ao Cadastrar Usuario`);
    }
  } catch (error) {
    alert(`Erro de Cadastrar `+error);
  }
}


export async function updatePessoa(data) {
  const data1 = {
    id_pessoa: data.id_pessoa,
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
    const response = await api.post('pessoa/editarPessoaByID', data1);
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
      const result = await api.post('/pessoa/deletePessoaByID/' + item.id_pessoa);
      if (result.status == 204) {
        alert('Excluido Com Sucesso')
        console.log(result)
        window.location.href = '/admin/usuario/pessoaMoztex'
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