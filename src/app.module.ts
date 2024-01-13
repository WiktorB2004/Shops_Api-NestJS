import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from "./database/database.module"
import * as Joi from 'joi'

@Module({
  imports: [ConfigModule.forRoot({
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
      PORT: Joi.number().default(3000),
    }),
  }),
  forwardRef(() => DatabaseModule)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
