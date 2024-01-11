import { Task, User } from "@/db/entities";
import { TaskStatus } from "@/db/entities/task.entity";
import dataSource from "@/db";
import { Like, Repository } from "typeorm";

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

interface FindAllTaskArgs {
  offset: number;
  limit: number;
  user?: string;
  status: string;
  userId?: string;
}

interface FindAllTaskResponse {
  tasks: Task[];
  total: number;
  totalPages: number;
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

  async findAll({
    offset,
    limit,
    user,
    status,
  }: FindAllTaskArgs): Promise<FindAllTaskResponse> {
    let where = {};

    if (user) where["user"] = { id: user };

    if (status) where["status"] = status.toLowerCase();

    const [tasks, total] = await this.repository.findAndCount({
      where,
      loadRelationIds: true,
      skip: offset,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      tasks,
      total,
      totalPages,
    };
  }

  async findAllByUser({
    offset,
    limit,
    status,
    userId,
  }: FindAllTaskArgs): Promise<FindAllTaskResponse> {
    let where = {};

    if (status) where["status"] = status.toLowerCase();

    if (userId) where["user"] = { id: userId };

    const [tasks, total] = await this.repository.findAndCount({
      where,
      loadRelationIds: true,
      skip: offset,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      tasks,
      total,
      totalPages,
    };
  }

  async update({ id, title, status }: UpdateTaskArgs): Promise<void> {
    await this.repository.update({ id }, { title, status });
  }

  async deleteTask(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export default TaskRepository;
