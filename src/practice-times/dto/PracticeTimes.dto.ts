import { ArrayMaxSize, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PracticeTimesType } from '../enums/practice-times-type.enum';
import { PracticeTimes } from '../interfaces/practice-times.interface';

export class PracticeTimesDto {
  @ApiProperty()
  @IsOptional()
  _id?: string;
  @ApiProperty()
  @ArrayMaxSize(2)
  monday: string[];
  @ApiProperty()
  @ArrayMaxSize(2)
  tuesday: string[];
  @ApiProperty()
  @ArrayMaxSize(2)
  wednesday: string[];
  @ApiProperty()
  @ArrayMaxSize(2)
  thursday: string[];
  @ApiProperty()
  @ArrayMaxSize(2)
  friday: string[];
  @ApiProperty()
  @ArrayMaxSize(2)
  saturday: string[];
  @ApiProperty()
  @ArrayMaxSize(2)
  sunday: string[];
  @ApiProperty()
  @IsNotEmpty()
  type: PracticeTimesType;
  @ApiProperty()
  remember: boolean;
  @ApiProperty()
  @IsOptional()
  userId?: string;
}
