const KEYS = {
    employees:"employees",
    employeesId:"employeesId"
}
export const getDepartmentCollection = () => (
    [
        {id:'1', tittle:"Recolha"},
        {id:'2', tittle:"Administracao"},
        {id:'3', tittle:"RH"}
    ]
)


export function insertemployees(data){
 let employees = getAllEmployees()
    data['id'] = generateEmployeesId()
    employees.push(data)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))

}

export function updateEmployees(data){   
    /*let employees = generateEmployeesId()
    let recordIndex = employees.findIndex(x => x.id == data.id)
    employees[recordIndex] ={...data}
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))*/

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
    if(localStorage.getItem(KEYS.employees) == null){
        localStorage.setItem(KEYS.employees, JSON.stringify([]))
    }

    let employees = JSON.parse(localStorage.getItem(KEYS.employees))

    let departaments = getDepartmentCollection();

   return employees.map(x =>({
        ...x, 
        departament : departaments[x.departamentId-1].tittle
    }))
}