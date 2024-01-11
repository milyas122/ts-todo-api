import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

export enum TaskStatus {
  Pending = "pending",
  Completed = "completed",
}

@Entity({ name: "task" })
export default class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ enumName: "TaskStatus", default: "pending" })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
