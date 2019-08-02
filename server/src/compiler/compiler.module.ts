import { Module } from '@nestjs/common';
import { CompilerController } from './compiler.controller';

@Module({
  controllers: [CompilerController],
})
export class CompilerModule {}
