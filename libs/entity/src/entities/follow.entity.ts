import { BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: 'follow' })
export class FollowEntity extends BaseEntity {
  @PrimaryColumn({ type: 'int', unsigned: true, primary: false })
  userId: number;

  @PrimaryColumn({ type: 'int', unsigned: true, primary: false })
  targetId: number;

  @CreateDateColumn({ type: 'timestamp' })
  readonly createdAt: Date;

  @ManyToOne(() => UserEntity, (e) => e.followingHistories, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => UserEntity, (e) => e.followedHistories, { onDelete: 'CASCADE' })
  @JoinColumn()
  target: UserEntity;
}
