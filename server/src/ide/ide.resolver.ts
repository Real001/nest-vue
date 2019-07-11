import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { IdeService } from './ide.service';
import { IdeGuard } from './ide.guard';
import { ID } from '../interfaces/common.interface';
import { Settings } from '../graphql.schema';


@Resolver('Ide')
export class IdeResolver {
	constructor(private readonly ideService: IdeService) {}
  @UseGuards(IdeGuard)

	@Query('settings')
	async getSettings(@Args('user') user: string): Promise<Settings> {
		return await this.ideService.findByUser(user);
	}
}