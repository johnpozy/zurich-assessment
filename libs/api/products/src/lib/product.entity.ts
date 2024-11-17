import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({
    name: 'id'
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'product_code'
  })
  productCode: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'product_description'
  })
  productDescription: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'location'
  })
  location: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'price'
  })
  price: number;
}
