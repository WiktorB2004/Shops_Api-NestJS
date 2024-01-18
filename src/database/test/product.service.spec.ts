import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../products/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

const mockProductModel = {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
};

describe('ProductService', () => {
    let productService: ProductService;
    let productModel: Model<any>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: getModelToken('Product'),
                    useValue: mockProductModel,
                },
            ],
        }).compile();

        productService = module.get<ProductService>(ProductService);
        productModel = module.get<Model<any>>(getModelToken('Product'));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(productService).toBeDefined();
    });

    describe('createProduct', () => {
        it('should create a product', async () => {
            const createProductDto: CreateProductDto = { productName: "TestProduct", supplierId: "65a57e1ed853368b7dc18100", price: 1200 };
            const mockCreatedProduct = { _id: "someId", ...createProductDto };

            mockProductModel.create.mockReturnValue(mockCreatedProduct);

            const result = await productService.createProduct(createProductDto);

            expect(mockProductModel.create).toHaveBeenCalledWith(createProductDto);
            expect(result).toEqual(mockCreatedProduct);
        });
    });

    describe('updateProduct', () => {
        it('should update a product', async () => {
            const originalProduct = {
                _id: "65a57e1ed853368b7dc18100",
                productName: "TestProduct",
                supplierId: "65a57e1ed853368b7dc18100",
                price: 1200,
            };

            const updatedProduct = {
                ...originalProduct,
                productName: "TestProduct2",
                supplierId: "65a57e1ed853368b7dc18101",
                price: 1300,
            };

            jest.spyOn(productService['productModel'], 'findByIdAndUpdate').mockResolvedValue(updatedProduct);

            const updateProductDto: UpdateProductDto = {
                productName: "TestProduct2",
                supplierId: "65a57e1ed853368b7dc18101",
                price: 1300,
            };

            const result = await productService.updateProduct("65a57e1ed853368b7dc18100", updateProductDto);

            expect(productService['productModel'].findByIdAndUpdate).toHaveBeenCalledWith(
                "65a57e1ed853368b7dc18100",
                updateProductDto,
                { new: true },
            );


            expect(result).toEqual(updatedProduct);
        });
    });

    // FIXME: * Similar tests can be written for other methods like updateProduct, getAllProducts, getProduct, deleteProduct. *
});
