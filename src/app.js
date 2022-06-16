import 'dotenv/config'

import express from 'express'
const app = express()

import rotas from './rotas/rotas.js'
const port = 8000

app.use(express.json())

app.use((rotas),)


/*
app.post('/user', (req, res)=>{
    const user = req.body
    console.log(user)
    console.log(user.name)
    console.log(user.id)
    console.log(user.email)
})
*/


app.listen(process.env.PORT || port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})