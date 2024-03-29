import { UserRepository, TaskRepository } from "@/repositories";
import { BadRequest } from "@/utils/errors/custom-errors";
import Task, { TaskStatus } from "@/db/entities/task.entity";

interface CreateTaskArgs {
  title: string;
  status: TaskStatus;
  userId: string;
}

interface UpdateTaskArgs {
  id: string;
  userId: string;
  title?: string;
  status?: TaskStatus;
}

interface TaskListArgs {
  userId: string;
  isAdmin: boolean;
  offset: number;
  limit: number;
  user: string;
  status: string;
}

interface FindAllTaskResponse {
  tasks: Task[];
  total: number;
  totalPages: number;
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

  async getTaskDetail(id: string, userId: string): Promise<Task | undefined> {
    const task = await this.taskRepository.findTask(id);

    if (!task) throw new BadRequest({ message: "task not found" });

    if (task.user.id !== userId) {
      throw new BadRequest({ message: "task not found" });
    }
    return task;
  }

  async removeTask(id: string, userId: string): Promise<void> {
    const task = await this.taskRepository.findTask(id);

    if (!task) throw new BadRequest({ message: "task not found" });

    if (task.user.id !== userId) {
      throw new BadRequest({ message: "task not found" });
    }

    await this.taskRepository.deleteTask(id);
  }

  async updateTask({
    id,
    userId,
    title,
    status,
  }: UpdateTaskArgs): Promise<void> {
    const task = await this.taskRepository.findTask(id);

    if (!task) throw new BadRequest({ message: "task not found" });

    if (task.user.id !== userId) {
      throw new BadRequest({ message: "task not found" });
    }
    const updatedTitle = title || task.title;
    const updatedStatus = status || task.status;
    await this.taskRepository.update({
      id,
      title: updatedTitle,
      status: updatedStatus,
    });
  }

  async getAllTasks({
    userId,
    isAdmin,
    offset,
    limit,
    user,
    status,
  }: TaskListArgs): Promise<FindAllTaskResponse> {
    let tasks: FindAllTaskResponse;

    if (Boolean(isAdmin)) {
      tasks = await this.taskRepository.findAll({
        offset,
        limit,
        user,
        status,
      });
    } else {
      tasks = await this.taskRepository.findAllByUser({
        offset,
        limit,
        status,
        userId,
      });
    }

    return tasks;
  }
}

export default AuthService;
