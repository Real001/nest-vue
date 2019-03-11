import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CustomerService } from './customer.service';
import { CustomerGuard } from './customer.guard';
import { ID } from '../interfaces/common.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Customer } from "../interfaces/customer.interface";

const pubSub = new PubSub();

@Resolver('Customer')
export class CustomerResolver {
	constructor(private readonly customerService: CustomerService) {}
  @UseGuards(CustomerGuard)

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