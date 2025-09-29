import { User } from '../entities/User';

export interface IFindOneBy {
  email: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export abstract class UserRepository {
  abstract findOneBy(data: IFindOneBy): Promise<User | null>;
  abstract save(user: ICreateUser): Promise<User>;
}
