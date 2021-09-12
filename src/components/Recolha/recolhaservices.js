import React, { useEffect, useState } from 'react'
import api from './api'
const KEYS = {
    requisitar:"requisitar",
    requisitarId:"requisitarId"
}
export const getDepartmentCollection = () => (
    [
        {id:'1', tittle:"Recolha"},
        {id:'2', tittle:"Administracao"},
        {id:'3', tittle:"RH"}
    ]
)

export function GetcutsheetCollection() {
    const [cutsheet, setcutsheet] = useState([]); //vindo da BD 
  
    useEffect(() => {
      async function loadcutsheet() {
        const res = await api.get('cutsheet/listar_cutsheet');
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
  
export function insertemployees(data){
 let requisitar = getAllEmployees()
    data['id'] = generateEmployeesId()
    requisitar.push(data)
    localStorage.setItem(KEYS.requisitar, JSON.stringify(requisitar))

}

export function updateEmployees(data){   
    /*let employees = generateEmployeesId()
    let recordIndex = employees.findIndex(x => x.id == data.id)
    employees[recordIndex] ={...data}
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))*/

} 

export function generateEmployeesId(){
    if(localStorage.getItem(KEYS.requisitarId) == null){
        localStorage.setItem(KEYS.requisitarId,  '0')
    }
    var id = parseInt(localStorage.getItem(KEYS.requisitarId))
    localStorage.setItem(KEYS.requisitarId, (++id).toString())
    return id;
}

export function getAllEmployees(){
    if(localStorage.getItem(KEYS.requisitar) == null){
        localStorage.setItem(KEYS.requisitar, JSON.stringify([]))
    }

    let requisitar = JSON.parse(localStorage.getItem(KEYS.requisitar))

    let departaments = getDepartmentCollection();

   return requisitar.map(x =>({
        ...x, 
        fk_cutsheet : departaments[x.fk_cutsheet-1].tittle
    }))
}