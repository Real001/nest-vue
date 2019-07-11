import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdeResolver } from './ide.resolver';
import { IdeService } from './ide.service';
import { SettingIde } from "./ide.schema";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'settingsIde', schema: SettingIde }])
	],
	providers: [ IdeService, IdeResolver ]
})
export class IdeModule {}
