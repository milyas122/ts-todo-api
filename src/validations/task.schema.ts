import { object, string } from "yup";

const taskSchema = object().shape({
  title: string().required().label("title"),
  status: string()
    .oneOf(["pending", "completed"])
    .default("pending")
    .label("Password"),
});

export { taskSchema };
