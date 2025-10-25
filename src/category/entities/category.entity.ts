import slugify from 'slugify';
import { Product } from 'src/product/entities/product.entity';
import {
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Category, (c) => c.children)
  parent: Category;

  @OneToMany(() => Category, (c) => c.parent)
  children: Category[];

  @OneToMany(() => Product, (p) => p.category)
  products: Product[];

  @BeforeInsert()
  @AfterUpdate()
  generatedSlug() {
    const date = new Date();
    this.slug = `${slugify(this.name)}-${date.getTime()}`;
  }
}
