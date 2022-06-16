import jwt from "jsonwebtoken";
import UserService from "../services/user_service.js";

export const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization ? authorization.split(" ")[1] : undefined;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Usuário não autorizado, faça login novamente." });
  }

  const secretKey = process.env.SECRETKEY;
  jwt.verify(
    token,
    secretKey,
    { ignoreExpiration: false },
    async (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Aconteceu um erro ao logar no sistema, por favor faça login novamente." });
      }

      const isValidToken = decodedToken && decodedToken.user;

      if (!isValidToken) {
        return res
          .status(401)
          .json({ message: "Aconteceu um erro ao logar no sistema" });
      }

      const userService = new UserService();
      const user = await userService.findByEmail(decodedToken.user.email);
      if (user) {
        return next();
      }
    }
  );
};
