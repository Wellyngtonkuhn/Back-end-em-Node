import 'dotenv/config'

import express from 'express'
import cors from 'cors'

const app = express()

import rotas from './rotas/rotas.js'
const port = 8000

app.use(cors())

app.use(express.json())

app.use((rotas),)


app.listen(process.env.PORT || port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})