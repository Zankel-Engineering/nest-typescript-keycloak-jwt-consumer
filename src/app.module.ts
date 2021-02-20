import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PracticeTimesModule } from './practice-times/practice-times.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TerminusModule.forRootAsync({
      useFactory: () => ({
        disableDeprecationWarnings: true,
        endpoints: [
          // ...
        ],
      }),
    }),
    PracticeTimesModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASS,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
}
