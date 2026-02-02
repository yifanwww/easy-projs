import { Module } from '@nestjs/common';
import { ServerLoggerService } from './logger.service.js';

@Module({
    providers: [ServerLoggerService],
    exports: [ServerLoggerService],
})
export class ServerLoggerModule {}
