import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Property } from '../../properties/entities/property.entity';
import { User } from '../../auth/entities/user.entity';

export enum LeadType {
  INQUIRY = 'inquiry',
  INSPECTION = 'inspection',
}

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'property_id' })
  propertyId: string;

  @ManyToOne(() => Property, { eager: false })
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @Column({ name: 'agent_id' })
  agentId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ type: 'enum', enum: LeadType, default: LeadType.INQUIRY })
  type: LeadType;

  @Column({ name: 'preferred_date', nullable: true })
  preferredDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
