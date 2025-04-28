import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

//React hooks -> ferramentas do react
function Home() {
  const [users,setUsers] = useState([]) //useState atualiza a variavel em tempo real

  //variaveis criadas para pegar a referência dos valores passado no input
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    try
    {
      const usersFromApi = await api.get('/usuarios')
      setUsers(usersFromApi.data)
    }
    catch(error)
    {
      console.error('Erro ao buscar usuários:', error)
    }
  }

  //função que envia as informações para criar um novo usuario
  async function createUsers()
  {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers() //chamando para trazer o dados atualizados na tela
  }

  async function deleteUsers(id)
  {
    await api.delete(`/usuarios/${id}`) //coloca a `` para conseguir atribuir uma variavel na URL
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return ( /*tudo que eu colocar dentro da {} é código js*/
      <div className='container'>
        <form >
          <h1>Cadastro de Usuários</h1>
          <input name='nome' type="text" placeholder='  Nome' ref={inputName}/>
          <input name='idade' type="number" placeholder='  Idade' ref={inputAge}/>
          <input name='email' type="email" placeholder='  Email' ref={inputEmail}/>
          <button type='button' onClick={createUsers}>Cadastrar</button>
        </form>

  {users.map(user => (
    <div key={user.id} className='card'>
    <div>
      <p>Nome:  <span>{user.name}</span></p>
      <p>Idade: <span>{user.age}</span></p>
      <p>Email: <span>{user.email}</span></p>
    </div>
    <button onClick={() => deleteUsers(user.id)}>
      <img src={Trash}/> {/* o jeito certo de chamar uma imagem no react, nunca por src="/../.."*/}
    </button>
  </div>
  ))}

      </div>
  )
}

export default Home