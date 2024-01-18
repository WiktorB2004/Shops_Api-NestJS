import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { forwardRef } from '@nestjs/common';
import { ProductsModule } from '../src/database/products/products.module';
import { SuppliersModule } from '../src/database/suppliers/suppliers.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi'
import mongoose from 'mongoose';

describe('Database Controller (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({
                validationSchema: Joi.object({
                    MONGO_USER: Joi.string().required(),
                    MONGO_PASSWD: Joi.string().required(),
                }),
            }), forwardRef(() => AppModule), forwardRef(() => SuppliersModule), forwardRef(() => ProductsModule), MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@marketdb.tonq7zg.mongodb.net/test`)],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/suppliers (GET)', async () => {

        const response = await request(app.getHttpServer()).get('/supplier');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'All suppliers data found successfully',
            supplierData: [{
                "_id": "65a57e1ed853368b7dc18109",
                "supplierName": "Tesla",
                "phoneNumber": "123 123 123 ",
                "email": "tesla@tesla.com",
                "products": [
                    "65a57e4ed853368b7dc1810c",
                    "65a57e56d853368b7dc18110",
                    "65a57e60d853368b7dc18114",
                    "65a57e66d853368b7dc18118",
                    "65a58ed422b47ff9338d023a"
                ],
                "productCount": 5,
                "__v": 0
            },
            {
                "_id": "65a58f3222b47ff9338d023e",
                "supplierName": "Bugatti",
                "phoneNumber": "+48 541 541 541",
                "email": "bugatti@bugati.com",
                "products": [
                    "65a7c786026ba039ffb469e4",
                    "65a7e77812035ef179222e04",
                    "65a8ff6251b230f61fccde68"
                ],
                "__v": 0,
                "productCount": 3
            }],
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await app.close();
    });
});
