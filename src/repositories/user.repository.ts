import { User } from "@/db/entities";
import dataSource from "@/db";
import { Repository } from "typeorm";

interface FindUserOptions {
  id?: string;
  email?: string;
}

interface UserArgs {
  email: string;
  password: string;
}

class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async findUser({ id, email }: FindUserOptions): Promise<User | undefined> {
    let where = {};
    if (id) where["id"] = id;
    if (email) where["email"] = email;

    const user = await this.repository.findOne({ where });

    return user;
  }

  async createUser({ email, password }: UserArgs): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    return await this.repository.save(user);
  }
}

export default UserRepository;
