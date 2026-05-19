import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

export enum AgentTier {
  FREE = 'free',
  PRO = 'pro',
  PREMIUM = 'premium',
}

@Entity('agents')
export class Agent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', unique: true })
  userId: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'agency_name', nullable: true })
  agencyName: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ type: 'enum', enum: AgentTier, default: AgentTier.FREE })
  tier: AgentTier;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
