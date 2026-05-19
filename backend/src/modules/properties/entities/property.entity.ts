import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { PropertyImage } from './property-image.entity';
import { PropertyAmenity } from './property-amenity.entity';

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  LAND = 'land',
  COMMERCIAL = 'commercial',
  SHORTLET = 'shortlet',
}

export enum PropertyStatus {
  RENT = 'rent',
  SALE = 'sale',
}

export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: PropertyType })
  type: PropertyType;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  price: number;

  @Column({ default: 'NGN' })
  currency: string;

  @Column({ type: 'enum', enum: PropertyStatus })
  status: PropertyStatus;

  @Column({ nullable: true })
  bedrooms: number;

  @Column({ nullable: true })
  bathrooms: number;

  @Column({ nullable: true })
  sqft: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 7 })
  latitude: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 7 })
  longitude: number;

  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  @Column({
    name: 'approval_status',
    type: 'enum',
    enum: ApprovalStatus,
    default: ApprovalStatus.PENDING,
  })
  approvalStatus: ApprovalStatus;

  @Column({ name: 'rejection_reason', nullable: true })
  rejectionReason: string;

  @Column({ name: 'agent_id' })
  agentId: string;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'agent_id' })
  agent: User;

  @OneToMany(() => PropertyImage, (img) => img.property, { cascade: true })
  images: PropertyImage[];

  @OneToMany(() => PropertyAmenity, (a) => a.property, { cascade: true })
  amenities: PropertyAmenity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
