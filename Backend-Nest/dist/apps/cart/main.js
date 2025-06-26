/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartModule = void 0;
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(5);
const cart_service_1 = __webpack_require__(6);
const cart_controller_1 = __webpack_require__(9);
const config_1 = __webpack_require__(11);
const cart_schema_1 = __webpack_require__(8);
let CartModule = class CartModule {
};
exports.CartModule = CartModule;
exports.CartModule = CartModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: 'apps/cart/.env'
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    uri: config.get('MONGO_URI'),
                }),
            }),
            mongoose_1.MongooseModule.forFeature([{ name: cart_schema_1.Cart.name, schema: cart_schema_1.CartSchema }]),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
        ],
        providers: [cart_service_1.CartService],
        controllers: [cart_controller_1.CartController],
    })
], CartModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 6 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartService = void 0;
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(7);
const cart_schema_1 = __webpack_require__(8);
let CartService = class CartService {
    cartModel;
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    async addToCart(data) {
        const existing = await this.cartModel.findOne({ uid: data.uid, pid: data.pid });
        if (existing) {
            const updated = await this.cartModel.findByIdAndUpdate(existing._id, { $inc: { qty: 1 } }, { new: true });
            return updated;
        }
        else {
            const cartItem = new this.cartModel({ ...data });
            const saved = await cartItem.save();
            return saved;
        }
    }
    async getCart(uid) {
        return this.cartModel.find({ uid });
    }
    async increment(cid) {
        const updated = await this.cartModel.findByIdAndUpdate(cid, { $inc: { qty: 1 } }, { new: true });
        return updated ?? { msg: 'item not found' };
    }
    async decrement(cid) {
        const item = await this.cartModel.findById(cid);
        if (item && item.qty > 1) {
            const updated = await this.cartModel.findByIdAndUpdate(cid, { $inc: { qty: -1 } }, { new: true });
            return updated;
        }
        else if (item) {
            return { msg: 'min qty reached' };
        }
        else {
            return { msg: 'item not found' };
        }
    }
    async deleteItem(cid) {
        await this.cartModel.findByIdAndDelete(cid);
        return { msg: 'prod del from cart' };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CartService);


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
exports.CartSchema = exports.Cart = void 0;
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(7);
let Cart = class Cart extends mongoose_2.Document {
    uid;
    pid;
    name;
    qty;
    price;
    pimg;
};
exports.Cart = Cart;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cart.prototype, "uid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cart.prototype, "pid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cart.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], Cart.prototype, "qty", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Cart.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Cart.prototype, "pimg", void 0);
exports.Cart = Cart = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Cart);
exports.CartSchema = mongoose_1.SchemaFactory.createForClass(Cart);


/***/ }),
/* 9 */
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartController = void 0;
const common_1 = __webpack_require__(4);
const microservices_1 = __webpack_require__(2);
const cart_service_1 = __webpack_require__(6);
const add_cart_dto_1 = __webpack_require__(10);
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    addCartTCP(data) {
        return this.cartService.addToCart(data);
    }
    getCartTCP(uid) {
        return this.cartService.getCart(uid);
    }
    incTCP(cid) {
        return this.cartService.increment(cid);
    }
    decTCP(cid) {
        return this.cartService.decrement(cid);
    }
    delTCP(cid) {
        return this.cartService.deleteItem(cid);
    }
    addCartHTTP(data) {
        return this.cartService.addToCart(data);
    }
    getCartHTTP(uid) {
        return this.cartService.getCart(uid);
    }
    incHTTP(cid) {
        return this.cartService.increment(cid);
    }
    decHTTP(cid) {
        return this.cartService.decrement(cid);
    }
    delHTTP(cid) {
        return this.cartService.deleteItem(cid);
    }
};
exports.CartController = CartController;
__decorate([
    (0, microservices_1.MessagePattern)('add_cart'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof add_cart_dto_1.AddCartDto !== "undefined" && add_cart_dto_1.AddCartDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addCartTCP", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_cart'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCartTCP", null);
__decorate([
    (0, microservices_1.MessagePattern)('inc_cart'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "incTCP", null);
__decorate([
    (0, microservices_1.MessagePattern)('dec_cart'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "decTCP", null);
__decorate([
    (0, microservices_1.MessagePattern)('del_cart'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "delTCP", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof add_cart_dto_1.AddCartDto !== "undefined" && add_cart_dto_1.AddCartDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addCartHTTP", null);
__decorate([
    (0, common_1.Get)(':uid'),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCartHTTP", null);
__decorate([
    (0, common_1.Patch)('inc/:cid'),
    __param(0, (0, common_1.Param)('cid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "incHTTP", null);
__decorate([
    (0, common_1.Patch)('dec/:cid'),
    __param(0, (0, common_1.Param)('cid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "decHTTP", null);
__decorate([
    (0, common_1.Delete)(':cid'),
    __param(0, (0, common_1.Param)('cid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "delHTTP", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [typeof (_a = typeof cart_service_1.CartService !== "undefined" && cart_service_1.CartService) === "function" ? _a : Object])
], CartController);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddCartDto = void 0;
class AddCartDto {
    uid;
    pid;
    name;
    qty;
    price;
    pimg;
}
exports.AddCartDto = AddCartDto;


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

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
const microservices_1 = __webpack_require__(2);
const cart_module_1 = __webpack_require__(3);
const config_1 = __webpack_require__(11);
const common_1 = __webpack_require__(4);
async function bootstrap() {
    const app = await core_1.NestFactory.create(cart_module_1.CartModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = app.get(config_1.ConfigService);
    const port = config.get("CART_PORT");
    const tcpPort = config.get("CART_TCP_PORT");
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: config.get("CART_TCP_HOST"),
            port: tcpPort
        }
    });
    app.enableCors();
    await app.startAllMicroservices();
    await app.listen(port ?? 3004);
    console.log(`CART micro service listening on port ${port ?? 3004}`);
}
bootstrap();

})();

/******/ })()
;