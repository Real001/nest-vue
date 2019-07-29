import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdeResolver } from './ide.resolver';
import { IdeService } from './ide.service';
import { SettingIde, Codes } from "./ide.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'settingsIde', schema: SettingIde },
      { name: 'codes', schema: Codes }
		])
	],
	providers: [ IdeService, IdeResolver ]
})
export class IdeModule {}
