import { randomUUID } from "node:crypto";

export class UserEntity {
  private readonly id: string;
  private name: string;
  private lastName: string;
  private password: string;

  constructor({
    id,
    name,
    lastName,
    password,
  }: {
    id?: string;
    name: string;
    lastName: string;
    password: string;
  }) {
    this.id = id || randomUUID();
    this.name = name;
    this.lastName = lastName;
    this.password = password;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
    };
  }
}
