import api from './api'


const KEYS = {
    users:"users",
    employeesId:"employeesId"
}
export const getDepartmentCollection = () => (
    [
        {id:'1', tittle:"Limpeza"},
        {id:'2', tittle:"Maquinista"},
        {id:'3', tittle:"Engomador"},
        {id:'4', tittle:"Recolha"},
        {id:'5', tittle:"Fiel Armazem"},
        {id:'6', tittle:"Administracao"},        
        {id:'7', tittle:"RH"},       
        {id:'8', tittle:"Chefe Producao"},
        {id:'9', tittle:"Cordenador"},        
        {id:'10', tittle:"Director Geral"},
    ]
)

export async function insertemployees(data){

    const data1 = {
        fk_id_tipo_usuario:data.fk_id_tipo_usuario,
        email:data.email, 
        password:data.password,
        state:data.state
      }

      const response = await api.post('user/create', data1);
    
      if (response.status == 200){             
        alert('Usuario '+ data1.email +' Registrado com sucesso');       
          }else if(response != 200){
            alert(`Erro ao Cadastrar Usuario`);
          }
}

export async function updateEmployees(data){    
    const data1 = {
        id_users:data.id_users,
        fk_id_tipo_usuario:data.fk_id_tipo_usuario,
        email:data.email, 
        password:data.password,
        state:data.state
      }
      const response = await api.post('user/editarUsuarioByID', data1);
            if (response.status == 200){
                
                }else if(response.status != 200){
                  alert(`Erro ao Actualizar  Usuario`);
                }
        }


        export async function deleteUser(iduser){    
            if(window.confirm("Deseja Realmente Excluir este Usuario?")){
                const result = await api.post('/user/deleteUsuarioByID/'+iduser);
                if(result.status == 204){  
                  window.location.href ='/admin/usuario/userMoztex'
                }else if(result.status != 204){
                  alert('Ocorreu Um Erro')
                }
             
            }
                }

export function generateEmployeesId(){
    if(localStorage.getItem(KEYS.employeesId) == null){
        localStorage.setItem(KEYS.employeesId,  '0')
    }
    var id = parseInt(localStorage.getItem(KEYS.employeesId))
    localStorage.setItem(KEYS.employeesId, (++id).toString())
    return id;
}

export function getAllEmployees(){ 
    if(localStorage.getItem(KEYS.users) == null){
        localStorage.setItem(KEYS.users, JSON.stringify([]))
    }else 
    return JSON.parse(localStorage.getItem(KEYS.users))

  
}  