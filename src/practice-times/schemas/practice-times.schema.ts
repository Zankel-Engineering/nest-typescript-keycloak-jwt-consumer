import { Schema } from 'mongoose';

export const practiceTimesSchema = new Schema(
  {
    type: {type: String, required: true},
    monday: {type: Object, required: false},
    tuesday: {type: Object, required: false},
    wednesday: {type: Object, required: false},
    thursday: {type: Object, required: false},
    friday: {type: Object, required: false},
    saturday: {type: Object, required: false},
    sunday: {type: Object, required: false},
    lastChange: {type: Date, required: false},
    remember: {type: Boolean, required: false},
    userId: {type: String, required: false},
  }, {collection: 'practiceTimes'});
