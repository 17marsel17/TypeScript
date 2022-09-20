import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = UserEntity;

@Schema()
export class UserEntity {
  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @Prop()
  public firstName: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
