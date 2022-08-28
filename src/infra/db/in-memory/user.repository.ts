import { UserEntity } from "@/core/domain/entities/user.entity";
import { UserRepositoryInterface } from "@/core/domain/repositories/user.repository";

export class UserInMemoryRepository implements UserRepositoryInterface {
  items: UserEntity[] = [];
  async create(user: UserEntity): Promise<UserEntity> {
    this.items.push(user);
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.items;
  }
}
