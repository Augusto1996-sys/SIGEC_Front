import api from './api'
const KEYS = {
  employees: "employees",
  employeesId: "employeesId"
} 


export async function insertAlocacao(data) {
  alert("Inserindo")
  const data1 = {
    fk_id_operario: data.fk_id_operario,
    fk_id_linha: data.fk_id_linha,
    fk_id_operacao: data.fk_id_operacao,
    fk_id_cutsheet: data.fk_id_cutsheet
  }


  try {
    const response = await api.post('alocar_operario/registar_alocar_operario', data1);
  
      if (response.status == 200) {
        alert('Alocao Efectuada Com Sucesso ')
        window.location.href = '/admin/usuario/alocar_operarioIndex'
      } else if (response.status != 200) {
        alert('Usuario NAo Excluido')
      }
    } catch (error) {
      alert('Erro Ao Excluir ' + error)
    }

}


export const getSectorCollection = () => (
  [

    { id: 'prod', tittle: "Producao" },
    { id: 'acab', tittle: "Acabamento" },
    { id: 'cut', tittle: "Corte" },
    { id: 'fusing', tittle: "Colagem" }
  ]
)
export const getLinhaCollection = () => (
  [
    { id: '19', tittle: "Linha 1" },
    { id: '20', tittle: "Linha 2" },
    { id: '21', tittle: "Linha 3" },
    { id: '22', tittle: "Linha 4" },
    { id: '23', tittle: "Linha 5" },
    { id: '24', tittle: "Linha 6" },
    { id: '25', tittle: "Linha 7" },
    { id: '26', tittle: "Linha 8" },
    { id: '27', tittle: "Linha 9" },
    { id: '28', tittle: "Linha 10" }
  ]
)

export const getLinhaCorteCollection = () => (
  [
    { id: '16', tittle: "Sem Linha" }
  ]
)

export const getLinhaAcabamentoCollection = () => (
  [
    { id: '17', tittle: "Sem Linha" }
  ]
)

export const getLinhaColagemCollection = () => (
  [
    { id: '15', tittle: "Sem Linha" }
  ]
)


export const getOperacaoesArmazemCollection = () => (
  [
    { id: 'o', tittle: "Fiel Armazem" },
    { id: 'o', tittle: "Ajudante" }
  ]
)


export const getOperacaoesCorteCollection = () => (
  [
    { id: '2', tittle: "Supervisor" },
    { id: '1', tittle: "Recolha" },
    { id: 'o', tittle: "Estendedor" },
    { id: 'o', tittle: "Cortador" }
  ]
)


export const getOperacaoesProducaoCollection = () => (
  [
    { id: '2', tittle: "Supervisor" },
    { id: '1', tittle: "Recolha" },
    { id: 'o', tittle: "Maquinista" },
    { id: 'o', tittle: "Engomador" }
  ]
)

export const getOperacaoesAcabamentoCollection = () => (
  [
    { id: '2', tittle: "Supervisor" },
    { id: '1', tittle: "Recolha" },
    { id: 'o', tittle: "Ajudante" }
  ]
)


