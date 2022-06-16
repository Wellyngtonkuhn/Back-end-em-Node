import { ObjectId } from "mongodb";
import ProdutoModel from '../shema/produtos-shema.js'

export default class ProdutoService {
  constructor() {}

  // cadastra usuário no banco de dados
  async create(produto) {
    await ProdutoModel.create(produto);
  }

  // lista todos os usuários
  async findAll() {
    return await ProdutoModel.find({});
  }

  // Lista por ID
  async findByID(id) {
    return await ProdutoModel.findById(ObjectId(id))
  }

}
