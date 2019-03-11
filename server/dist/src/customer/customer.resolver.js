"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const customer_service_1 = require("./customer.service");
const customer_guard_1 = require("./customer.guard");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const pubSub = new graphql_subscriptions_1.PubSub();
let CustomerResolver = class CustomerResolver {
    constructor(customerService) {
        this.customerService = customerService;
    }
    getCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.customerService.findAll();
        });
    }
    customer(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.customerService.findOneById(_id);
        });
    }
    create(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const createCustomer = yield this.customerService.create(args);
            pubSub.publish('customerCreated', { customerCreated: createCustomer });
            return createCustomer;
        });
    }
    customerCreated() {
        return {
            subscribe: () => pubSub.asyncIterator('customerCreated'),
        };
    }
};
__decorate([
    common_1.UseGuards(customer_guard_1.CustomerGuard),
    graphql_1.Query('getCustomers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "getCustomers", null);
__decorate([
    graphql_1.Query('customer'),
    __param(0, graphql_1.Args('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "customer", null);
__decorate([
    graphql_1.Mutation('createCustomer'),
    __param(0, graphql_1.Args('createCustomerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDTO]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "create", null);
__decorate([
    graphql_1.Subscription('customerCreated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomerResolver.prototype, "customerCreated", null);
CustomerResolver = __decorate([
    graphql_1.Resolver('Customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerResolver);
exports.CustomerResolver = CustomerResolver;
//# sourceMappingURL=customer.resolver.js.map