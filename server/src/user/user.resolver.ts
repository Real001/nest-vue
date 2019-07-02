import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UserService } from './customer.service';
import { UserGuard } from './customer.guard';
import { ID } from '../interfaces/common.interface';
import { CreateCustomerDTO } from './dto/create-user.dto';
import { Customer } from "../interfaces/user.interface";

const pubSub = new PubSub();

@Resolver('Customer')
export class UserResolver {
	constructor(private readonly customerService: UserService) {}
  @UseGuards(UserGuard)

	@Query('getCustomers')
	async getCustomers(): Promise<Customer[]> {
		return await this.customerService.findAll();
	}

  @Query('customer')
  async customer(@Args('_id') _id: ID): Promise<Customer> {
    return await this.customerService.findOneById(_id);
  }

  @Mutation('createCustomer')
  async create(@Args('createCustomerInput') args: CreateCustomerDTO): Promise<Customer> {
	  const createCustomer = await this.customerService.create(args);
		pubSub.publish('customerCreated', { customerCreated: createCustomer });
		return createCustomer;
  }

	@Subscription('customerCreated')
	customerCreated() {
		return {
			subscribe: () => pubSub.asyncIterator('customerCreated'),
		};
	}
}