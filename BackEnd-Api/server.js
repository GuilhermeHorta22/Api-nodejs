import express from 'express' //tenho que importar a biblioteca, mesmo que eu tenha instalado ela
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient() //tudo que a gente precisar vai estar aqui dentro

//declarando uma variavel para receber o express como uma função, e assim eu conseguir acessar tudo
const app = express();
app.use(express.json()) //estou avisando o express que vou utiliza o formato json
app.use(cors()) //diz quais paginas pode acessar o BackEnd

//nesse caso eu vou ter que pegar oque chegou atraves do req, e assim cadastrar o usuario
app.post('/usuarios', async (req,res) =>{
    await prisma.user.create({ //eu tenho que mandar oque está mapeado lá
        data: { //vou mandar para o banco oque está vindo na requisição
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    
    //dizendo que deu certo e mostrando para ele o usuario criado
    res.status(201).json(req.body)
})

//criando uma rota que devolva algo
app.get('/usuarios', async (req,res) =>{
    let users = []
    if(req.query.name || req.query.email || req.query.age)
    {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    }
    else
        users = await prisma.user.findMany()
    //buscando no banco os registros cadastrado nele
    
    res.status(200).json(users) //retornando uma resposta
})

//alterando um usuario do nosso banco de dados
//quando tem os : no caminho indica que é uma variavel que está sendo passada
app.put('/usuarios/:id', async (req,res) => {
    console.log(req)
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

//função que busca um usuario pelo id e deleta ele, esse id é parassado por parametro na url da requisição
app.delete('/usuarios/:id', async (req,res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    //retornando uma mensagem de sucesso
    res.status(200).json({message: 'Usuário deletado com sucesso!'})
})

app.listen(3000)


/*
    objetivo é criar nossa API de usuarios com:
    - criar um usuario
    - lista todos os usuarios
    - editar um usuario
    - deletar um usuario
*/