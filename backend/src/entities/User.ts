import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Conversation } from './Conversation';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userName!: string;

    @Column()
    passwordHash!: string;

    @Column({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    lastName?: string;

    @ManyToMany(() => Conversation, conversation => conversation.participants)
    conversations!: Conversation[];
}
