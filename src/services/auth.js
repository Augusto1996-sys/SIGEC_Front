export const TOKEN_KEY = '&app-token';
export const  ID_USUARIO = '&id-usuario';
export const  NOME_USUARIO = '&nome-usuario';
export const TUSER_TYPE = '&user-type'
export const TUSER_Axn = '&user-logado'

export const login = token => {localStorage.setItem(TOKEN_KEY, token);}
export const logout = () => {window.localStorage.clear()}

export const setIdUsuario = id => localStorage.setItem(ID_USUARIO, id)
export const getIdUsuario = () => localStorage.getItem(ID_USUARIO)

export const setNomeUsuario = nome => localStorage.setItem(NOME_USUARIO, nome)
export const getNomeUsuario = () => localStorage.getItem(NOME_USUARIO)

export const setTipoUsuario = tipo => localStorage.setItem(TUSER_TYPE, tipo)
export const getTipoUsuario = () => localStorage.getItem(TUSER_TYPE)

export const setUsuario = user => localStorage.setItem(TUSER_Axn, JSON.stringify(user))
export const getoUsuario = () => localStorage.getItem(TUSER_Axn)

export const getToken = () => localStorage.getItem(TOKEN_KEY)



