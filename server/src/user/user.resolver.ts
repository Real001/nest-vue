import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';
import { ID } from '../interfaces/common.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from "../interfaces/user.interface";

const pubSub = new PubSub();

@Resolver('User')
export class UserResolver {
	constructor(private readonly usersService: UserService) {}
  @UseGuards(UserGuard)

	@Query('getUsers')
	async getUsers(): Promise<User[]> {
		return await this.usersService.findAll();
	}

  @Query('user')
  async user(@Args('_id') _id: ID): Promise<User> {
    return await this.usersService.findOneById(_id);
  }

  @Mutation('createUser')
  async create(@Args('createUser') args: CreateUserDTO): Promise<User> {
		console.log(args)
	  const createUser = await this.usersService.create(args);
		pubSub.publish('userCreated', { customerCreated: createUser });
		return createUser;
  }

	@Subscription('userCreated')
	customerCreated() {
		return {
			subscribe: () => pubSub.asyncIterator('userCreated'),
		};
	}
}