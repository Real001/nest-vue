import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from '../interfaces/user.interface';
import { ID } from '../interfaces/common.interface';

@Injectable()
export class UserService {
	constructor(@InjectModel('User') private readonly UserModel: Model<User>) { }
	async create(createUserDTO: CreateUserDTO): Promise<User> {
		const newUser = await this.UserModel(createUserDTO);
		return newUser.save();
	}
	async update(id: ID, createUserDTO: CreateUserDTO): Promise<User> {
		const updatedUser = await this.UserModel
			.findByIdAndUpdate(id, createUserDTO, { new: true });
		return updatedUser;
	}

	async delete(id: ID): Promise<any> {
		return await this.UserModel.findByIdAndRemove(id);
	}

	async findAll(): Promise<User[]> {
		return await this.UserModel.find().exec();
	}

	async findOneById(id: ID): Promise<User> {
		return await this.UserModel.findById(id).exec();
	}
	
	async findByEmail(email: string): Promise<User> {
		return await this.UserModel.findByEmail(email).exec();
	}
}
