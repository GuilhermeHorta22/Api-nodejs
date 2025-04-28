import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export default api //eu tenho que exportar essa conexão