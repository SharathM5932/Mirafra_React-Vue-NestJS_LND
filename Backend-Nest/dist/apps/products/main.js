/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsModule = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(4);
const products_service_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(6);
const product_schema_1 = __webpack_require__(8);
const config_1 = __webpack_require__(10);
const products_controller_1 = __webpack_require__(11);
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: 'apps/products/.env'
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    uri: config.get('MONGO_URI'),
                }),
            }),
            mongoose_1.MongooseModule.forFeature([{ name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema }]),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: 'apps/category/.env',
            }),
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'CATEGORY_SERVICE',
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: (config) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: config.get('CATEGORY_TCP_HOST', 'localhost'),
                            port: config.get('CATEGORY_TCP_PORT', 3008),
                        },
                    }),
                },
            ])
        ],
        providers: [products_service_1.ProductsService],
        controllers: [products_controller_1.ProductsGatewayController],
    })
], ProductsModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(6);
const mongoose_2 = __webpack_require__(7);
const product_schema_1 = __webpack_require__(8);
const microservices_1 = __webpack_require__(4);
const rxjs_1 = __webpack_require__(9);
let ProductsService = class ProductsService {
    productModel;
    client;
    constructor(productModel, client) {
        this.productModel = productModel;
        this.client = client;
    }
    async addProduct(dto, file) {
        try {
            const newProduct = new this.productModel({
                ...dto,
                pimg: file?.filename || '',
            });
            await newProduct.save();
            const existingCat = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'get_category_by_name' }, dto.cat));
            if (!existingCat) {
                await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'create_category' }, { cat: dto.cat, desc: '' }));
            }
            return {
                msg: 'Product added successfully',
                product: newProduct,
            };
        }
        catch (err) {
            console.error('Error saving product:', err);
            throw new common_1.InternalServerErrorException('Could not save product');
        }
    }
    async getAllProducts() {
        try {
            return await this.productModel.find();
        }
        catch (err) {
            console.error('Error retrieving products:', err);
            throw new common_1.InternalServerErrorException('Could not retrieve products');
        }
    }
    async updateProduct(id, updateData) {
        try {
            const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedProduct)
                throw new Error('Product not found');
            return {
                msg: 'Product updated successfully',
                product: updatedProduct,
            };
        }
        catch (err) {
            console.error('Error updating product:', err);
            throw new common_1.InternalServerErrorException('Could not update product');
        }
    }
    async deleteProduct(id) {
        try {
            const deleted = await this.productModel.findByIdAndDelete(id);
            if (!deleted)
                throw new Error('Product not found');
            return { msg: 'Product deleted successfully', product: deleted };
        }
        catch (err) {
            console.error('Error deleting product:', err);
            throw new common_1.InternalServerErrorException('Could not delete product');
        }
    }
    async getProductById(id) {
        try {
            const product = await this.productModel.findById(id);
            if (!product)
                throw new Error('Product not found');
            return product;
        }
        catch (err) {
            console.error('Error getting product by ID:', err);
            throw new common_1.InternalServerErrorException('Could not get product');
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(1, (0, common_1.Inject)('CATEGORY_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], ProductsService);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = __webpack_require__(6);
let Product = class Product {
    name;
    cat;
    price;
    desc;
    pimg;
};
exports.Product = Product;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "cat", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "desc", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "pimg", void 0);
exports.Product = Product = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Product);
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsGatewayController = void 0;
const common_1 = __webpack_require__(3);
const platform_express_1 = __webpack_require__(12);
const add_product_dto_1 = __webpack_require__(13);
const products_service_1 = __webpack_require__(5);
const multer_1 = __webpack_require__(15);
const path_1 = __webpack_require__(16);
let ProductsGatewayController = class ProductsGatewayController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    async addProduct(body, file) {
        const filename = file?.filename || '';
        return this.productService.addProduct(body, file);
    }
    async getAllProducts() {
        return this.productService.getAllProducts();
    }
    async getById(id) {
        return this.productService.getProductById(id);
    }
    async updateProduct(id, body) {
        return this.productService.updateProduct(id, body);
    }
    async deleteProduct(id) {
        return this.productService.deleteProduct(id);
    }
};
exports.ProductsGatewayController = ProductsGatewayController;
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('pimg', {
        storage: (0, multer_1.diskStorage)({
            destination: './prodimgs',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            }
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof add_product_dto_1.AddProductDto !== "undefined" && add_product_dto_1.AddProductDto) === "function" ? _b : Object, typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], ProductsGatewayController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsGatewayController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsGatewayController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof Partial !== "undefined" && Partial) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], ProductsGatewayController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsGatewayController.prototype, "deleteProduct", null);
exports.ProductsGatewayController = ProductsGatewayController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [typeof (_a = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _a : Object])
], ProductsGatewayController);


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddProductDto = void 0;
const class_validator_1 = __webpack_require__(14);
class AddProductDto {
    name;
    price;
    cat;
    desc;
}
exports.AddProductDto = AddProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddProductDto.prototype, "cat", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddProductDto.prototype, "desc", void 0);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("multer");

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const products_module_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(4);
const config_1 = __webpack_require__(10);
const path_1 = __webpack_require__(16);
async function bootstrap() {
    const app = await core_1.NestFactory.create(products_module_1.ProductsModule);
    const config = app.get(config_1.ConfigService);
    const port = config.get("PRODUCT_PORT");
    const tcpPort = config.get("PRODUCT_TCP_PORT");
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: config.get("PRODUCT_TCP_HOST"),
            port: tcpPort
        }
    });
    app.useStaticAssets((0, path_1.join)(process.cwd(), "prodimgs"), {
        prefix: "/prodimgs/",
    });
    await app.startAllMicroservices();
    app.enableCors();
    await app.listen(port ?? 3002);
    console.log(`Product micro service listening on port ${port ?? 3002}`);
}
bootstrap();

})();

/******/ })()
;