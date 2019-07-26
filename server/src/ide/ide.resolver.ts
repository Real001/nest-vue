import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Subscription, Context } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { IdeService } from './ide.service';
import { GqlAuthGuard } from '../auth/auth.graphql;
import { ID } from '../interfaces/common.interface';
import { Settings } from '../graphql.schema';


@Resolver('Ide')
export class IdeResolver {
	constructor(private readonly ideService: IdeService) {}
  @UseGuards(GqlAuthGuard)
	@Query('settings')
	async getSettings(@Context() ctx, @Args('user') user: string): Promise<Settings> {
		console.log(ctx);
		return await this.ideService.findByUser(user);
	}

	@Mutation('updateSettings')
	async updateSettings(@Args('settings') settings: Settings, @Args('idUser') id: string): Promise<Settings> {
		return this.ideService.updateSettings(settings, id);
	}
}