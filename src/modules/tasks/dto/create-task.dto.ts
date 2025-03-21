import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTaskDto {
  @IsString({
    message: 'User Id must be a string',
  })
  @IsNotEmpty({
    message: 'User Id is required',
  })
  userId: Types.ObjectId;

  @IsString({
    message: 'Title must be a string',
  })
  @IsNotEmpty({
    message: 'Title is required',
  })
  title: string;

  @IsString({
    message: 'Description must be a string',
  })
  @IsNotEmpty({
    message: 'Description is required',
  })
  description: string;

  @IsNotEmpty({
    message: 'Date is required',
  })
  date: Date;

  @IsBoolean({
    message: 'Archieved must be a boolean',
  })
  archieved: boolean;
}
