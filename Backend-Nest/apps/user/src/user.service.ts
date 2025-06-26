import { Module, NotFoundException } from '@nestjs/common';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
// import { UserController } from './user.controller';
import { User, UserDocument, UserSchema } from './schema/user.schema';
// import { AuthService } from 'src/auth/auth.service';

import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }
    //find all users
    async findall(): Promise<User[]> {
        return this.userModel.find().exec();
    }
    //find user by email
    async findByEmail(emailid: string): Promise<User | null> {
        return this.userModel.findOne({ emailid });
    }

    //create user
    async create(data: Partial<User>): Promise<User> {
        const newUser = new this.userModel(data)
        console.log(`check user`, newUser)
        return newUser.save()
    }

    //update user by id
    async updateUser(id: string, updateData: Partial<User>): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!updatedUser) {
            console.log(`User with ID ${id} not found`)
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return updatedUser;
    }

    //delete user by id
    async deleteUser(id: string): Promise<{ message: string }> {
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) {
            console.log(`User with ID ${id} not found`)
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return { message: 'User deleted successfully' };
    }

    // update password by email
    async updatePasswordByEmail(emailid: string, hashedPwd: string): Promise<User> {
        const updatedUser = await this.userModel.findOneAndUpdate(
            { emailid },
            { pwd: hashedPwd },
            { new: true }
        );

        if (!updatedUser) {
            throw new NotFoundException(`User with email ${emailid} not found`);
        }

        return updatedUser;
    }
}
