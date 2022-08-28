import { BaseUseCase } from "../../../base/use-cases/base.use-case";
import { UserRepositoryInterface } from "../../../domain/repositories/user.repository";

type CreateUserData = {
  name: string;
  lastName: string;
  password: string;
};
type CreateUserOutput = Omit<CreateUserData, "password"> & {
  id: string;
};
export class GetAllUser implements BaseUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(): Promise<CreateUserOutput[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => user.toJSON());
  }
}
