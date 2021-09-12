export const getusuarioTipo = (value) => {
    let usuario_tipo = '';

    if(value == 1){
        usuario_tipo = 'Limpeza'
    }else if(value == 2){
        usuario_tipo = 'Maquinista'
    }else if(value == 3){
        usuario_tipo = 'Engomador'
    }else if(value == 4){
        usuario_tipo = 'Recolha'
    }else if(value == 5){
        usuario_tipo = 'Fiel Armazem'
    }else if(value == 6){
        usuario_tipo = 'Administracao'
    }else if(value == 7){
        usuario_tipo = 'RH'
    }else if(value == 8){
        usuario_tipo = 'Chefe Producao'
    }else if(value == 9){
        usuario_tipo = 'Gordenador'
    }else if(value == 10){
        usuario_tipo = 'Director Geral'
    }else if(value == 11){
        usuario_tipo = 'Administrador'
    }
    return usuario_tipo;
}




export const getusuarioTipoLabel = (value) => {
    var arr = ['primary','default','secondary',]
    return arr[value-1];
}