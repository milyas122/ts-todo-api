import { setSeederFactory } from "typeorm-extension";
import { User } from "@/db/entities";

export const UsersFactory = setSeederFactory(User, () => {
  const user = new User();
  user.email = "admin@gmail.com";
  user.password = "kwanso"; // Password will be hashed in production
  user.isAdmin = true;
  return user;
});
