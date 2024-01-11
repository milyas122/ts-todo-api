import { UserRepository, InviteUserRepository } from "@/repositories";
import { BadRequest } from "@/utils/errors/custom-errors";
import { comparePassword, generateToken } from "@/utils";

interface SignInArgs {
  email: string;
  password: string;
}

interface SignInResponse {
  id: string;
  email: string;
}

interface InviteUserResponse {
  message: string;
  invitationLink: string;
}

class AuthService {
  private userRepository: UserRepository;
  private inviteUserRepository: InviteUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.inviteUserRepository = new InviteUserRepository();
  }

  async SignIn({
    email,
    password,
  }: SignInArgs): Promise<{ user: SignInResponse; token: string }> {
    const user = await this.userRepository.findUser({ email });

    if (!user) {
      throw new BadRequest({ message: "email or password is incorrect" });
    }

    // to save time i created an admin with plain text password that's why this condition check user type
    if (!user.isAdmin) {
      const isMatch = await comparePassword({
        password,
        userPassword: user.password,
      });

      if (!isMatch) {
        throw new BadRequest({ message: "email or password is incorrect" });
      }
    } else {
      if (password !== user.password) {
        throw new BadRequest({ message: "email or password is incorrect" });
      }
    }

    const token = await generateToken(user);

    return { user: { id: user.id, email: user.email }, token };
  }

  async InviteUser(email: string): Promise<InviteUserResponse> {
    const user = await this.userRepository.findUser({ email });

    if (user) {
      throw new BadRequest({ message: "user already exists" });
    }

    const isInvited = await this.inviteUserRepository.findUser(email);

    if (isInvited) {
      throw new BadRequest({ message: "user already invited" });
    }

    const inviteToken = Math.random().toString(36).substring(2, 15);
    const expiration = Date.now() + 1 * 60 * 1000; // 1 minute timeout

    await this.inviteUserRepository.createInvite({
      email,
      token: inviteToken,
      timeout: `${expiration}`,
    });
    console.log(`http://localhost:5000/api/signup/${inviteToken}`);

    return {
      message: "user invited successfully",
      invitationLink: `http://localhost:5000/api/signup/${inviteToken}`,
    };
  }

  async ResendInvitation(email: string): Promise<InviteUserResponse> {
    const isInvited = await this.inviteUserRepository.findUser(email);

    if (!isInvited) {
      throw new BadRequest({ message: "user not invited yet" });
    }

    const expiration = Date.now() + 1 * 60 * 1000; // 1 minute timeout
    const { token } = await this.inviteUserRepository.updateInvite(
      email,
      `${expiration}`
    );
    console.log(`http://localhost:5000/api/signup/${token}`);

    return {
      message: "user invited successfully",
      invitationLink: `http://localhost:5000/api/signup/${token}`,
    };
  }
}

export default AuthService;
