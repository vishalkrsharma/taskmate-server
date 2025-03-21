import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Task {
  @Prop({
    required: true,
    ref: 'User',
    type: Types.ObjectId,
  })
  userId: Types.ObjectId;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  date: Date;

  @Prop({
    default: false,
  })
  isArchived: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
