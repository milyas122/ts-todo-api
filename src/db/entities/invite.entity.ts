import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "inviteUser" })
export default class InviteUser {
  @PrimaryColumn()
  token: string;

  @Column()
  timeout: string;

  @Column()
  email: string;
}
