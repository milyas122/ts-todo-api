import { InviteUser } from "@/db/entities";
import dataSource from "@/db";
import { Repository } from "typeorm";

type CreateInviteUserArgs = {
  email: string;
  token: string;
  timeout: string;
};

class InviteUserRepository {
  private repository: Repository<InviteUser>;

  constructor() {
    this.repository = dataSource.getRepository(InviteUser);
  }

  async findUser(email: string): Promise<InviteUser | undefined> {
    const invitedUserToken = await this.repository.findOne({
      where: { email },
    });

    return invitedUserToken;
  }

  async createInvite({
    email,
    token,
    timeout,
  }: CreateInviteUserArgs): Promise<void> {
    const userInvite = new InviteUser();
    userInvite.email = email;
    userInvite.token = token;
    userInvite.timeout = timeout;
    await this.repository.save(userInvite);
  }
}

export default InviteUserRepository;
