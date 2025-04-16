import express from 'express' //tenho que importar a biblioteca, mesmo que eu tenha instalado ela

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient() //tudo que a gente precisar vai estar aqui dentro

//declarando uma variavel para receber o express como uma função, e assim eu conseguir acessar tudo
const app = express();
app.use(express.json()) //estou avisando o express que vou utiliza o formato json

const user = []

//nesse caso eu vou ter que pegar oque chegou atraves do req, e assim cadastrar o usuario
app.post('/usuarios', (req,res) =>{
    user.push(req.body) //salvando o usuario na varivael criada
    
    //dizendo que deu certo e mostrando para ele o usuario criado
    res.status(201).json(req.body)
})

//criando uma rota que devolva algo
app.get('/usuarios', (req,res) =>{
    res.status(200).json(user) //retornando uma resposta
})

app.listen(3000)

/*
    objetivo é criar nossa API de usuarios com:
    - criar um usuario
    - lista todos os usuarios
    - editar um usuario
    - deletar um usuario
*/