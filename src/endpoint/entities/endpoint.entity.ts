import { Permission } from 'src/permissions/entities/permission.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export type HttpEndpoint = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

@Entity()
export class Endpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  method: HttpEndpoint;

  @OneToMany(() => Permission, (permission) => permission.endpoint)
  permissions: Permission[];
}
