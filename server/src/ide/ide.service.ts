import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ID } from '../interfaces/common.interface';
import { Settings, Code } from '../graphql.schema';

@Injectable()
export class IdeService {

	constructor(
		@InjectModel('settingsIde') private readonly SettingsModel: Model<Settings>,
    @InjectModel('codes') private readonly CodeModel: Model<Code>,
	) { }


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

  async saveCode(code: string, id: string, name: string, lang: string): Promise<Code> {
		return await this.CodeModel.create({ user: id, code, name, lang, updatedAt: new Date(), createdAt: new Date() });
  }

  async listCodeUser(user: string): Promise<Code[]> {
		return await this.CodeModel.find({ user }).exec();
	}

  async findOneByIdCode(id: ID): Promise<Code> {
    return await this.CodeModel.findById(id).exec();
  }
}
