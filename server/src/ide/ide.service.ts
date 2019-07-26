import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ID } from '../interfaces/common.interface';
import { Settings } from '../graphql.schema';

@Injectable()
export class IdeService {

	constructor(@InjectModel('settingsIde') private readonly SettingsModel: Model<Settings>) { }


	async findAll(): Promise<Settings[]> {
		return await this.SettingsModel.find().exec();
	}

	async findOneById(id: ID): Promise<Settings> {
		return await this.SettingsModel.findById(id).exec();
	}
	
	async findByUser(user: string): Promise<Settings> {
		return await this.SettingsModel.findOne({user}).exec();
	}

	async updateSettings(settings: Settings, id: string): Promise<Settings> {
		return await this.SettingsModel.findOneAndUpdate({ user: id }, { ...settings, user: id });
	}
}
