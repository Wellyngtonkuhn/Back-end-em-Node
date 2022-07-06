import express from "express";
import jwt from "jsonwebtoken";


import { authMiddleware } from "../middlewares/authMiddleware.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";


import UserService from "../services/user_service.js";
import ProdutoService from '../services/produto_service.js'
const rotas = express.Router();

rotas.use(express.urlencoded({extended: true}))



// Home
rotas.get("/", (req, res) => {
  res.status(200).send("<h1>Home</h1>");
});

//Login
rotas.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userService = new UserService();
  const isLogged = await userService.login(email, password);
  if (isLogged) {
    const secretKey = process.env.SECRETKEY;
    const token = jwt.sign({ user: isLogged }, secretKey, { expiresIn: "1d" });
    return res.status(200).json({ token });
  }
  return res.status(400).json({ message: "E-mail ou senha incorretos." });
});

// Busca todos os produtos
rotas.get('/produtos', async (req, res) => {
  const produtoService = new ProdutoService()
  const produtos = await produtoService.findAll()
  return res.status(200).json(produtos)
})

// Lista produto pelo Id
rotas.get('/produtos/:id', async (req, res) => {
  const id = req.params.id
  const produtoService = new ProdutoService()
  const produtoId = await produtoService.findByID(id)
  if(produtoId){
    return res.status(200).json(produtoId)
  }
  return res.status(404).json({ message: "Produto não encontrado" })
})

// Lista todos as fotos
rotas.use('/uploads', express.static('uploads'))

// Listar todos os dados do banco de dados
rotas.get("/cadastro", async (req, res) => {
  const userService = new UserService();
  const user = await userService.findAll();
  return res.status(200).json(user);
});

// Listar dados do banco de dados pelo id
rotas.get("/cadastro/:id", async (req, res) => {
  const id = req.params.id;
  const userService = new UserService();
  const user = await userService.findById(id);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ message: "Usuário não encontrado" });
});

// Todas as rotas abaixo estão protegidas.
rotas.use(authMiddleware)

// Cadastrar usuário
rotas.post("/cadastro", async (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password };
  const userService = new UserService();
  await userService.create(user);
  return res.status(201).json(user);
});

// Edita os dados
rotas.put("/cadastro/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  const user = { name, email, password };
  const userService = new UserService();
  const findUser = await userService.findById(id);
  if (findUser) {
    await userService.update(id, user);
    return res.status(200).json({ message: "Usuário editado com sucesso." });
  }

  return res.status(404).json({ message: "Usuário não encontrado." });
});

// Excluiu os dados
rotas.delete("/cadastro/:id", async (req, res) => {
  const id = req.params.id;
  const userService = new UserService();
  const user = await userService.findById(id);
  if (user) {
    await userService.delete(id);
    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  }
  return res.status(404).json({ message: "Usuário não encontrado." });
});


// Cadastra os produtos
rotas.post('/produtos', uploadMiddleware.single('image'), async (req, res) => {
  const { nome, descricao, valor, sumario, estoque } = req.body
  const fileName = req.file.filename
  const produto = { nome, descricao, valor, sumario, estoque, fileName }
  const produtoService = new ProdutoService()
  await produtoService.create(produto)
  return res.status(200).json(produto)
})

// Rota de venda
rotas.post('/produtos/vendas', async (req, res) => {
  const { produtos } = req.body
  const produtoService = new ProdutoService()

  for(const produto of produtos){
    await produtoService.venderProduto(produto)
  }
  
  return res.status(200).json({ message: "Success"})
})


export default rotas;
