import {
    IsDateString,
    IsEnum,
    IsNumber,
    IsOptional,
} from "class-validator";
import {BetStatus} from "../entities/bet.entity";

export class UpdateBetDto {
    @IsNumber()
    @IsOptional()
    odds?: number;

    @IsDateString()
    @IsOptional()
    deadline?: string;

    @IsEnum(BetStatus)
    @IsOptional()
    status?: BetStatus;
}
