import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    username!: string;

    @Column()
    firstName?: string;

    @Column()
    lastName?: string;
}
