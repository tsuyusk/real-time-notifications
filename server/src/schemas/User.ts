import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity('users')
export default class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;
}
