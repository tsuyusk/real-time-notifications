import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity('notifications')
export default class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  seen: boolean;

  @Column()
  target_id: string;
}
