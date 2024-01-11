import { Task, User } from "@/db/entities";
import { TaskStatus } from "@/db/entities/task.entity";
import dataSource from "@/db";
import { Repository } from "typeorm";

interface CreateTaskArgs {
  title: string;
  status: TaskStatus;
  user: User;
}

class TaskRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = dataSource.getRepository(Task);
  }

  async findTask(id: string): Promise<Task | undefined> {
    return await this.repository.findOne({
      where: { id },
      relations: ["user"],
    });
  }

  async createTask({ title, status, user }: CreateTaskArgs): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.status = status;
    task.user = user;

    return await this.repository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export default TaskRepository;
