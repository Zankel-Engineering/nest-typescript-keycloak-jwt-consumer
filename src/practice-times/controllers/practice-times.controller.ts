import { Body, Controller, Get, Inject, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Roles } from '../../core/decorators/roles.decorator';
import { RolesGuard } from '../../core/guards/roles.guard';
import { AuthorizationHeaderDecoded } from '../../core/decorators/authorization-header-decoded.decorator';
import { PracticeTimes } from '../interfaces/practice-times.interface';
import { PracticeTimesService } from '../services/practice-times.service';
import { PracticeTimesType } from '../enums/practice-times-type.enum';
import { PracticeTimesDto } from '../dto/PracticeTimes.dto';
import { Role } from '../enums/role.enum';

@Controller('practiceTimes')
export class PracticeTimesController {

  constructor(@Inject(PracticeTimesService) private practiceTimesService: PracticeTimesService) {}

  /** Get practice times for online for a specific user */
  @Get('online')
  @ApiOkResponse({description: 'Get practice times for online for a specific user'})
  @UseGuards(RolesGuard)
  @Roles(Role.tester, Role.member)
  public async getPracticeTimesOnline(@AuthorizationHeaderDecoded('sub') userId): Promise<PracticeTimes | {}> {
    return this.practiceTimesService.getPracticeTimes(userId, PracticeTimesType.Online);
  }

  /** Get practice times for real life for a specific user */
  @Get('reallife')
  @ApiOkResponse({description: 'Get practice times for real life for a specific user'})
  @UseGuards(RolesGuard)
  @Roles(Role.tester, Role.member)
  public async getPracticeTimesReallife(@AuthorizationHeaderDecoded('sub') userId): Promise<PracticeTimes | {}> {
    return this.practiceTimesService.getPracticeTimes(userId, PracticeTimesType.Reallife);
  }

  /** Get all practice times for a specific user */
  @Get('reallife')
  @ApiOkResponse({description: 'Get all practice times for a specific user'})
  @UseGuards(RolesGuard)
  @Roles(Role.tester, Role.member)
  public async getAllPracticeTimes(@AuthorizationHeaderDecoded('sub') userId):
    Promise<{realLife: PracticeTimes | {}, online: PracticeTimes | {}}> {
    return this.practiceTimesService.getAllPracticeTimes(userId);
  }

  /** Updates practice times online for a specific user */
  @Post('online')
  @ApiOkResponse({description: 'Update online practice times for a specific user'})
  @UseGuards(RolesGuard)
  @Roles(Role.tester, Role.member)
  public async updateOnlinePracticeTimes(@AuthorizationHeaderDecoded('sub') userId, @Body() payload: PracticeTimesDto):
    Promise<PracticeTimes | {}> {
    return this.practiceTimesService.handlePracticeTimes(userId, PracticeTimesType.Online, payload);
  }

  /** Updates practice times real life for a specific user */
  @Post('reallife')
  @ApiOkResponse({description: 'Update real life practice times for a specific user'})
  @UseGuards(RolesGuard)
  @Roles(Role.tester, Role.member)
  public async updateRealLifePracticeTimes(@AuthorizationHeaderDecoded('sub') userId, @Body() payload: PracticeTimesDto):
    Promise<PracticeTimes | {}> {
    return this.practiceTimesService.handlePracticeTimes(userId, PracticeTimesType.Online, payload);
  }

  /** Create practice times online for a specific user */
  @Put('online')
  @ApiOkResponse({description: 'Update online practice times for a specific user'})
  @UseGuards(RolesGuard)
  @Roles(Role.tester, Role.member)
  public async createOnlinePracticeTimes(@AuthorizationHeaderDecoded('sub') userId, @Body() payload: PracticeTimesDto):
    Promise<PracticeTimes | {}> {
    return this.practiceTimesService.handlePracticeTimes(userId, PracticeTimesType.Online, payload);
  }

  /** Creates practice times real life for a specific user */
  @Put('reallife')
  @ApiOkResponse({description: 'Create real life practice times for a specific user'})
  @UseGuards(RolesGuard)
  @Roles(Role.tester, Role.member)
  public async createRealLifePracticeTimes(@AuthorizationHeaderDecoded('sub') userId, @Body() payload: PracticeTimesDto):
    Promise<PracticeTimes | {}> {
    return this.practiceTimesService.handlePracticeTimes(userId, PracticeTimesType.Online, payload);
  }
}
