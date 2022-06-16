import { ObjectId } from "mongodb";
import UserModel from "../shema/users.js";

export default class UserService {
  constructor() {}

  // cadastra usuário no banco de dados
  async create(user) {
    await UserModel.create(user);
  }

  // lista todos os usuários
  async findAll() {
    return await UserModel.find({});
  }

  // filtra os usuários pelo id
  async findById(id) {
    return await UserModel.findById({ _id: ObjectId(id) });
  }

  // edita os dados do banco
  async update(id, user) {
    await UserModel.updateOne({ _id: ObjectId(id) }, user);
  }

  // excluiu os dados do banco
  async delete(id) {
    await UserModel.deleteOne({ _id: ObjectId(id) });
  }

  // Encontra o usuário por email para o login
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  // login
  async login(email, password) {
    if ((email, password)) {
      const user = await this.findByEmail(email);
      if (user) {
        const auth = user.password === password;
        if (auth) {
          return user;
        }
        return null;
      }
      return null;
    }
    return null;
  }
}
