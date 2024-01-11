import { UserRepository, TaskRepository } from "@/repositories";
import { BadRequest } from "@/utils/errors/custom-errors";
import Task, { TaskStatus } from "@/db/entities/task.entity";

interface CreateTaskArgs {
  title: string;
  status: TaskStatus;
  userId: string;
}

class AuthService {
  private taskRepository: TaskRepository;
  private userRepository: UserRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
    this.userRepository = new UserRepository();
  }

  async createTask({ title, status, userId }: CreateTaskArgs): Promise<Task> {
    const user = await this.userRepository.findUser({ id: userId });
    if (!user) {
      throw new BadRequest({ message: "user not found" });
    }
    const task = await this.taskRepository.createTask({ title, status, user });
    return task;
  }

  async getTaskDetail(id: string): Promise<Task | undefined> {
    const task = await this.taskRepository.findTask(id);
    if (!task) throw new BadRequest({ message: "task not found" });
    return task;
  }
}

export default AuthService;
