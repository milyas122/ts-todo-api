import { object, string } from "yup";

const loginSchema = object().shape({
  email: string().email().required().label("Email Address"),
  password: string().required().label("Password"),
});

const signupSchema = loginSchema;

export { loginSchema, signupSchema };
