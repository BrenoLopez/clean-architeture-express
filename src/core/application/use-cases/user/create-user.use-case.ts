import { BaseUseCase } from "../../../base/use-cases/base.use-case";
import { UserEntity } from "../../../domain/entities/user.entity";
import { HasherInterface } from "../../../domain/interfaces/hasher.interface";
import { UserRepositoryInterface } from "../../../domain/repositories/user.repository";

type CreateUserData = {
  name: string;
  lastName: string;
  password: string;
};
type CreateUserOutput = Omit<CreateUserData, "password"> & {
  id: string;
};
export class CreateUser implements BaseUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly hasher: HasherInterface
  ) {}

  async execute(user: CreateUserData): Promise<CreateUserOutput> {
    const passwordHash = await this.hasher.hash(user.password);
    const userCreate = new UserEntity({ ...user, password: passwordHash });
    await this.userRepository.create(userCreate);
    return userCreate.toJSON();
  }
}
