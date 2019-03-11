import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Customer } from "../interfaces/customer.interface";
import { ID } from '../interfaces/common.interface';

@Injectable()
export class CustomerService {
	constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) { }
	async create(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
		const newCustomer = await this.customerModel(createCustomerDTO);
		return newCustomer.save();
	}
	async update(id: ID, createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
		const updatedCustomer = await this.customerModel
			.findByIdAndUpdate(id, createCustomerDTO, { new: true });
		return updatedCustomer;
	}

	async delete(id: ID): Promise<any> {
		return await this.customerModel.findByIdAndRemove(id);
	}

	async findAll(): Promise<Customer[]> {
		return await this.customerModel.find().exec();
	}

	async findOneById(id: ID): Promise<Customer> {
		return await this.customerModel.findById(id).exec();
	}
}
