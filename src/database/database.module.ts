import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { AppModule } from '../app.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi'

@Module({
    imports: [ConfigModule.forRoot({
        validationSchema: Joi.object({
            DATABASE_ENV: Joi.string()
                .valid('test', 'market_data')
                .default('test'),
            MONGO_USER: Joi.string().required(),
            MONGO_PASSWD: Joi.string().required(),
        }),
    }), forwardRef(() => AppModule), forwardRef(() => SuppliersModule), forwardRef(() => ProductsModule), MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@marketdb.tonq7zg.mongodb.net/${process.env.DATABASE_ENV}`)],
    providers: [],
    exports: [SuppliersModule, ProductsModule],
})
export class DatabaseModule { }