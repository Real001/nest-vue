import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from  '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from '../interfaces/user.interface';
import { ID } from '../interfaces/common.interface';

@Injectable()
export class UserService {
  private saltRounds = 10;

	constructor(
		@InjectModel('User') private readonly UserModel: Model<User>,
  	private readonly jwtService: JwtService
	) { }

	async create(createUserDTO: CreateUserDTO): Promise<any> {
		try {
      createUserDTO.hash = await this.getHash(createUserDTO.password);
      createUserDTO.password = undefined;
      const newUser = await this.UserModel(createUserDTO);
      newUser.save();
      let payload = `${newUser._id}`;
      const accessToken = this.jwtService.sign(payload);
      return {
        expires_in: 3600,
        code_student_token: accessToken,
        status: 200
      }
    } catch (e) {
			console.error(e.message)
    }
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

  async findOne(find: object): Promise<User> {
    return await this.UserModel.findOne(find).exec();
  }

	async findOneById(id: ID): Promise<User> {
		return await this.UserModel.findById(id, { hash: 0 }).exec();
	}
	
	async findByEmail(email: string): Promise<User> {
		return await this.UserModel.findOne({email}).exec();
	}

  async getHash(password: string|undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async checkPassword(password: string, hash: string): Promise<boolean> {
		console.log(password, hash)
		return await bcrypt.compare(password, hash);
	}
}
