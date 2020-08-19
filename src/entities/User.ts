import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { hash } from "bcryptjs";
import { uuid } from "uuidv4";
import { Appointment } from "./Appointment";

@Entity()
export class User {
  @PrimaryColumn()
  public readonly id: string;

  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public emailIsVerified: boolean;

  @Column({ unique: true })
  public cpf: string;

  @Column()
  public gender: string;

  @Column()
  public phone: string;

  @Column({ select: false })
  public password: string;

  @Column()
  public birth_date: Date;

  @Column()
  public rule: string;

  @OneToMany(type => Appointment, appointment => appointment.user)
  public appointments: Appointment[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }

  constructor(props: Omit<User, 'id'|'hashPassword'>, id?: string) {
    Object.assign(this, props);
    this.rule = "client";

    if (!id) {
      this.id = uuid();
    }
  }
}
