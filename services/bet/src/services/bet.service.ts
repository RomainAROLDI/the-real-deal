import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
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
        const bet = this.betRepository.create(createBetDto);
        return this.betRepository.save(bet);
    }

    async findAll(): Promise<Bet[]> {
        return this.betRepository.find();
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
        return this.betRepository.save(bet);
    }

    async softDelete(id: number): Promise<void> {
        const bet = await this.findOne(id);
        await this.betRepository.softRemove(bet);
    }

    async restore(id: number): Promise<Bet> {
        const bet = await this.betRepository.findOne({where: {id}, withDeleted: true});
        if (!bet) {
            throw new NotFoundException(`Bet with ID ${id} not found`);
        }
        bet.deletedAt = null;
        return this.betRepository.save(bet);
    }
}
