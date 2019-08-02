import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdeResolver } from './ide.resolver';
import { IdeService } from './ide.service';
import { SettingIde, Codes } from './ide.schema';
import { CompilerModule } from '../compiler/compiler.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'settingsIde', schema: SettingIde },
      { name: 'codes', schema: Codes },
    ]),
    CompilerModule,
  ],
  providers: [IdeService, IdeResolver],
})
export class IdeModule {}
