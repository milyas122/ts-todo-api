import { Task, User } from "@/db/entities";
import { TaskStatus } from "@/db/entities/task.entity";
import dataSource from "@/db";
import { Repository } from "typeorm";
import { BadRequest } from "@/utils/errors/custom-errors";

interface CreateTaskArgs {
  title: string;
  status: TaskStatus;
  user: User;
}

interface UpdateTaskArgs {
  id: string;
  title: string;
  status: TaskStatus;
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

  async update({ id, title, status }: UpdateTaskArgs): Promise<void> {
    await this.repository.update({ id }, { title, status });
  }

  async deleteTask(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export default TaskRepository;
