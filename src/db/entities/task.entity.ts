import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

@Entity({ name: "task" })
export default class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: "longtext", nullable: true })
  content: string;

  @Column({ default: false })
  isAdmin: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
