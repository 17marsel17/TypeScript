import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSignInDto, UserSignUpDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserEntity } from './entities/user.entity';
import { Connection, Model } from 'mongoose';
import { throwError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}
  async createNewUser(userDto: UserSignUpDto) {
    const newUser = new this.userModel({
      email: userDto.email,
      firstName: userDto.firstName,
      password: await bcrypt.hash(userDto.password, 10),
    });

    return await newUser.save();
  }

  async findOne(email: string) {
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }
}
