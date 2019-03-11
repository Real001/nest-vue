"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const app_service_1 = require("./app.service");
const customer_service_1 = require("../customer/customer.service");
const customer_module_1 = require("../customer/customer.module");
const date_scalar_1 = require("../common/scalars/date.scalar");
const config_module_1 = require("../config/config.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/nest-vue', { useNewUrlParser: true }),
            graphql_1.GraphQLModule.forRoot({
                typePaths: ['./**/*.graphql'],
                installSubscriptionHandlers: true,
                definitions: {
                    path: path_1.join(process.cwd(), 'src/graphql.schema.ts'),
                    outputAs: 'class',
                },
            }),
            app_service_1.AppService,
            customer_module_1.CustomerModule,
            config_module_1.ConfigModule,
        ],
        providers: [date_scalar_1.DateScalar, customer_service_1.CustomerService,],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map