import Mongoose from '../db/db.js'

const produtoShema = new Mongoose.Schema(
    {
        nome: String,
        descricao: String,
        valor: Number,
        sumario: String,
        estoque: Number,
        fileName: String,
    },
    {
        collection: 'produtos',
        timestamps: true
    }
)


export default Mongoose.model('produtos', produtoShema, 'produtos')


