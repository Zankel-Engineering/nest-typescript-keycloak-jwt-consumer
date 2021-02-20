import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from '../core/middleware/logger.middleware';
import { PracticeTimesController } from './controllers/practice-times.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PracticeTimesService } from './services/practice-times.service';
import { practiceTimesSchema } from './schemas/practice-times.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PracticeTimes', schema: practiceTimesSchema }]),
  ],
  controllers: [
    PracticeTimesController,
  ],
  providers: [
    PracticeTimesService,
  ],
  exports: [],
})
export class PracticeTimesModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
