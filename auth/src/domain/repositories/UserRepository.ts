import { User } from '../entities/User';

export interface IFindOneBy {
  email: string;
}

export abstract class UserRepository {
  abstract findOneBy(data: IFindOneBy): Promise<User | null>;
}
