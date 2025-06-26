import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: Partial<User>): Promise<User> {
    // Check if email already exists
    const existingUser = await this.userModel
      .findOne({
        email: userData.email,
      })
      .exec();

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Check if username already exists
    const existingUsername = await this.userModel
      .findOne({
        username: userData.username,
      })
      .exec();

    if (existingUsername) {
      throw new ConflictException('Username already in use');
    }

    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  // async findByEmail(email: string): Promise<User | null> {
  //   console.log('Searching for user with email:', email);
  //   const user = await this.userModel.findOne({ email }).exec();
  //   console.log('User found:', user);
  //   return user;
  // }
  async findByEmail(email: string): Promise<User | null> {
    console.log('Searching for user with email:', email);
    try {
      const user = await this.userModel.findOne({ email }).lean().exec();
      console.log('User found:', user);
      return user;
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.userModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }

  async updatePassword(email: string, newPassword: string): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { email },
      { password: newPassword },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }
}
