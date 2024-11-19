import {Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

export enum BetStatus {
    PENDING = 'PENDING',
    WON = 'WON',
    LOST = 'LOST',
    CANCELLED = 'CANCELLED',
}

export enum BetChoice {
    HOME = '1',
    N = 'N',
    AWAY = '2',
}

@Entity('bets')
export class Bet {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'int'})
    matchId: number;

    @Column({type: 'float'})
    odds: number;

    @Column({
        type: 'enum',
        enum: BetChoice,
    })
    choice: BetChoice;

    @Column({type: 'timestamp'})
    deadline: Date;

    @Column({
        type: 'enum',
        enum: BetStatus,
        default: BetStatus.PENDING,
    })
    status: BetStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;
}
