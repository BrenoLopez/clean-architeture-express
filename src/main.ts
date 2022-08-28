import express from "express";
import { CreateUser } from "./core/application/use-cases/user/create-user.use-case";
import { GetAllUser } from "./core/application/use-cases/user/get-all-user.use-case";
import { UserInMemoryRepository } from "./infra/db/in-memory/user.repository";
import { BcryptAdapter } from "@/core/infra/adapters/bcrypt-adapter";

const app = express();
const PORT = 3333;
const repository = new UserInMemoryRepository();
const createUserUseCase = new CreateUser(repository, new BcryptAdapter());

const getAllUsersUseCase = new GetAllUser(repository);

app.use(express.json());
app.post("/users", async (request, response) => {
  const user = await createUserUseCase.execute(request.body);
  return response.status(200).json(user);
});

app.get("/users", async (request, response) => {
  const users = await getAllUsersUseCase.execute();
  return response.status(200).json(users);
});

app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`));
