import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  Subscription,
  Context,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { IdeService } from './ide.service';
import { AuthGuard } from '../auth/auth.guard';
import { ID } from '../interfaces/common.interface';
import { Settings, Code } from '../graphql.schema';

@Resolver('Ide')
export class IdeResolver {
  constructor(private readonly ideService: IdeService) {}
  @UseGuards(AuthGuard)
  @Query('listCodeUser')
  async listCodeUser(
    @Context() ctx,
    @Args('user') user: string,
  ): Promise<Code[]> {
    return await this.ideService.listCodeUser(user);
  }

  @UseGuards(AuthGuard)
  @Query('settings')
  async getSettings(
    @Context() ctx,
    @Args('user') user: string,
  ): Promise<Settings> {
    return await this.ideService.findByUser(user);
  }

  @UseGuards(AuthGuard)
  @Query('codeById')
  async codeById(
    @Context() ctx,
    @Args('_id') id: string,
  ): Promise<Code> {
    return await this.ideService.findOneByIdCode(id);
  }

  @UseGuards(AuthGuard)
  @Mutation('updateSettings')
  async updateSettings(
    @Args('settings') settings: Settings,
    @Args('idUser') id: string,
  ): Promise<Settings> {
    return this.ideService.updateSettings(settings, id);
  }

  @UseGuards(AuthGuard)
  @Mutation('saveCode')
  async saveCode(
    @Args('code') code: string,
    @Args('idUser') id: string,
    @Args('name') name: string,
    @Args('lang') lang: string,
  ): Promise<Code> {
    return this.ideService.saveCode(code, id, name, lang);
  }
}
