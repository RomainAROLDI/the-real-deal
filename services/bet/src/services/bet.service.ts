import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {QueryFailedError, Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {Bet} from '../entities/bet.entity';
import {CreateBetDto} from '../dto/create-bet.dto';
import {UpdateBetDto} from '../dto/update-bet.dto';

@Injectable()
export class BetService {
    constructor(
        @InjectRepository(Bet)
        private readonly betRepository: Repository<Bet>,
    ) {
    }

    async create(createBetDto: CreateBetDto): Promise<Bet> {
        try {
            const newBet = this.betRepository.create(createBetDto);
            return await this.betRepository.save(newBet);
        } catch (error) {
            if (error instanceof QueryFailedError && error.driverError.code === 'ER_DUP_ENTRY') {
                throw new ConflictException(
                    'A bet with the same matchId and choice already exists.',
                );
            }
            throw error;
        }
    }

    async findAll(): Promise<Bet[]> {
        return await this.betRepository.find();
    }

    async findOne(id: number): Promise<Bet> {
        const bet = await this.betRepository.findOne({where: {id}});
        if (!bet) {
            throw new NotFoundException(`Bet with ID ${id} not found`);
        }
        return bet;
    }

    async update(id: number, updateBetDto: UpdateBetDto): Promise<Bet> {
        const bet = await this.findOne(id);
        Object.assign(bet, updateBetDto);
        return await this.betRepository.save(bet);
    }

    async softDelete(id: number): Promise<Bet> {
        const bet = await this.findOne(id);
        if (!bet) {
            throw new NotFoundException(`Bet with ID ${id} not found`);
        }
        return await this.betRepository.softRemove(bet);
    }

    async restore(id: number): Promise<Bet> {
        const bet = await this.betRepository.findOne({where: {id}, withDeleted: true});
        if (!bet) {
            throw new NotFoundException(`Bet with ID ${id} not found`);
        }
        bet.deletedAt = null;
        return await this.betRepository.save(bet);
    }
}
