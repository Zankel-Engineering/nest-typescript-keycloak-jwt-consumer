import { Document } from 'mongoose';
import { PracticeTimesType } from '../enums/practice-times-type.enum';

export interface PracticeTimes extends Document {
  userId?: string;
  type?: string;
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
  remember: boolean;
  lastChange?: Date;
}
