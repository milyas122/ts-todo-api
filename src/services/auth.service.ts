import { UserRepository } from "@/repositories";
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

class AuthService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn({
    email,
    password,
  }: SignInArgs): Promise<{ user: SignInResponse; token: string }> {
    const user = await this.repository.findUser({ email });

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
}

export default AuthService;
