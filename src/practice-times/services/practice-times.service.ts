import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PracticeTimes } from '../interfaces/practice-times.interface';
import { PracticeTimesType } from '../enums/practice-times-type.enum';
import { PracticeTimesDto } from '../dto/PracticeTimes.dto';

Injectable()
export class PracticeTimesService {

  public constructor(@InjectModel('PracticeTimes') private readonly practiceTimesModel: Model<PracticeTimes>) {}

  /** Retrieves the practice times for a specific user */
  public async getPracticeTimes(userId: string, type: PracticeTimesType): Promise<PracticeTimes | {}> {
    try {
      const result = await this.practiceTimesModel.findOne({userId, type});
      return result || {};
    } catch (e) {
      Logger.error(`Something wen\'t wrong while retrieving the ${type} practice times`, e);
      throw new NotFoundException(`The ${type} results for your user were not found in the database`);
    }
  }

  /** Retrieves all practice times for a specific user */
  public async getAllPracticeTimes(userId: string): Promise<{realLife: PracticeTimes | {}, online: PracticeTimes | {}}> {
    try {
      const realLife: PracticeTimes = await this.practiceTimesModel.findOne({userId, type: PracticeTimesType.Reallife});
      const online: PracticeTimes = await this.practiceTimesModel.findOne({userId, type: PracticeTimesType.Online});
      return {realLife, online};
    } catch (e) {
      Logger.error(`Something wen\'t wrong while retrieving the all practice times`, e);
      throw new NotFoundException(`The all practice time results for your user were not found in the database`);
    }
  }

  /** Updates/Creates practice times for a specific user */
  public async handlePracticeTimes(userId: string, type: PracticeTimesType, payload: PracticeTimesDto): Promise<PracticeTimes | {}> {
    const practiceTimes: PracticeTimes = payload as PracticeTimes;
    practiceTimes.userId = userId;
    practiceTimes.lastChange = new Date();
    practiceTimes.type = type;
    const _id = practiceTimes._id;
    delete practiceTimes._id;
    try {
      const _ = _id ?
        await this.practiceTimesModel.updateOne({_id}, practiceTimes) :
        await this.practiceTimesModel.create(practiceTimes);
      return await this.practiceTimesModel.findOne({userId, type});
    } catch (e) {
      const msg: string = 'Something went wrong while handling practice times creation or update'
      Logger.error(msg);
      throw new InternalServerErrorException(msg)
    }
  }
}
