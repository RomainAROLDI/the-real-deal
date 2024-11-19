import {Controller, Get, Post, Body, Param, Patch, Delete} from '@nestjs/common';
import {CreateBetDto} from '../dto/create-bet.dto';
import {UpdateBetDto} from '../dto/update-bet.dto';
import {BetService} from "../services/bet.service";

@Controller('bets')
export class BetController {
    constructor(private readonly betsService: BetService) {
    }

    @Post()
    create(@Body() createBetDto: CreateBetDto) {
        return this.betsService.create(createBetDto);
    }

    @Get()
    findAll() {
        return this.betsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.betsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateBetDto: UpdateBetDto) {
        return this.betsService.update(id, updateBetDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.betsService.softDelete(id);
    }

    @Patch(':id/restore')
    restore(@Param('id') id: number) {
        return this.betsService.restore(id);
    }
}
