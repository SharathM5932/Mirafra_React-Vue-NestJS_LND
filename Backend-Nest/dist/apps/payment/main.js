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

module.exports = require("@nestjs/common");

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
exports.PaymentModule = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(4);
const payment_controller_1 = __webpack_require__(5);
const payment_service_1 = __webpack_require__(6);
const payment_schema_1 = __webpack_require__(8);
let PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: async () => ({
                    uri: "mongodb+srv://madanwalevenkateshj:guqbWxgK5KVq9h9w@cluster0.w3gibek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
                }),
            }),
            mongoose_1.MongooseModule.forFeature([{ name: payment_schema_1.Payment.name, schema: payment_schema_1.PaymentSchema }]),
        ],
        controllers: [payment_controller_1.PaymentController],
        providers: [payment_service_1.PaymentService],
    })
], PaymentModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

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
exports.PaymentController = void 0;
const common_1 = __webpack_require__(2);
const payment_service_1 = __webpack_require__(6);
const create_payment_dto_1 = __webpack_require__(9);
let PaymentController = class PaymentController {
    service;
    constructor(service) {
        this.service = service;
    }
    async addTransaction(dto) {
        return this.service.addTransaction(dto);
    }
    async getAll() {
        return this.service.getAll();
    }
    async getByEmail(email) {
        return this.service.getByEmail(email);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_payment_dto_1.CreatePaymentDto !== "undefined" && create_payment_dto_1.CreatePaymentDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "addTransaction", null);
__decorate([
    (0, common_1.Get)("/allTransactions"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/allTransactions:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getByEmail", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [typeof (_a = typeof payment_service_1.PaymentService !== "undefined" && payment_service_1.PaymentService) === "function" ? _a : Object])
], PaymentController);


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
exports.PaymentService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(4);
const mongoose_2 = __webpack_require__(7);
const payment_schema_1 = __webpack_require__(8);
let PaymentService = class PaymentService {
    model;
    constructor(model) {
        this.model = model;
    }
    async addTransaction(dto) {
        const record = await this.model.findOne({ emailid: dto.emailid });
        if (record) {
            record.transactions.push(dto.transaction);
            return record.save();
        }
        else {
            return this.model.create({
                emailid: dto.emailid,
                transactions: [dto.transaction],
            });
        }
    }
    async getAll() {
        return this.model.find();
    }
    async getByEmail(emailid) {
        return this.model.findOne({ emailid });
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_schema_1.Payment.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], PaymentService);


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
exports.PaymentSchema = exports.Payment = void 0;
const mongoose_1 = __webpack_require__(4);
const mongoose_2 = __webpack_require__(7);
let Payment = class Payment extends mongoose_2.Document {
    emailid;
    transactions;
};
exports.Payment = Payment;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Payment.prototype, "emailid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], Payment.prototype, "transactions", void 0);
exports.Payment = Payment = __decorate([
    (0, mongoose_1.Schema)()
], Payment);
exports.PaymentSchema = mongoose_1.SchemaFactory.createForClass(Payment);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePaymentDto = void 0;
class CreatePaymentDto {
    emailid;
    transaction;
}
exports.CreatePaymentDto = CreatePaymentDto;


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
const common_1 = __webpack_require__(2);
const payment_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(payment_module_1.PaymentModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    const port = 3005;
    await app.listen(port);
    console.log(`Payment MicroService is running on ${port} `);
}
bootstrap();

})();

/******/ })()
;