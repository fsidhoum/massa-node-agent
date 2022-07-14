import { Global, Module } from '@nestjs/common';
import { MnaLogger } from './mna-logger';

@Global()
@Module({
  providers: [MnaLogger],
  exports: [MnaLogger],
})
export class CommonModule {}
