import { Injectable } from '@nestjs/common';
import { UserSignUpDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserEntity } from './entities/user.entity';
import { Connection, Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}
  async createNewUser(userDto: UserSignUpDto): Promise<UserDocument> {
    const newUser = new this.userModel({
      email: userDto.email,
      firstName: userDto.firstName,
      password: await bcrypt.hash(userDto.password, 10),
    });

    return await newUser.save();
  }

  async findOne(email: string) {
    return this.userModel.findOne({ email: email });
  }
}
