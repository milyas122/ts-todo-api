import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Task from "./task.entity";

@Entity({ name: "user" })
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
