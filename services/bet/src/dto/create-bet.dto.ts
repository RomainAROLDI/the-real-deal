import {IsNumber, IsEnum, IsDateString, IsInt, IsOptional} from 'class-validator';
import {BetChoice, BetStatus} from '../entities/bet.entity';

export class CreateBetDto {
    @IsInt()
    matchId: number;

    @IsNumber()
    odds: number;

    @IsEnum(BetChoice)
    choice: BetChoice;

    @IsDateString()
    deadline: string;

    @IsEnum(BetStatus)
    @IsOptional()
    status?: BetStatus;
}
