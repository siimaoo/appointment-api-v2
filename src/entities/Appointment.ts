import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { uuid } from "uuidv4";

@Entity()
export class Appointment {
  @PrimaryColumn()
  public readonly id: string;

  @Column()
  public date: Date;

  @Column()
  public status: string;

  @ManyToOne(type => User, user => user.appointments)
  public user: User;

  constructor(props: Omit<Appointment, "id" | "hashPassword">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
