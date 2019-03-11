import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';
import { CustomerSchema } from "./customer.schema";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }])
	],
	providers: [ CustomerService, CustomerResolver ]
})
export class CustomerModule {}
