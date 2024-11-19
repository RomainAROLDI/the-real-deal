import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BetService} from '../services/bet.service';
import {Bet} from "../entities/bet.entity";
import {BetController} from "../controllers/bet.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Bet])],
    controllers: [BetController],
    providers: [BetService],
})
export class BetModule {
}
