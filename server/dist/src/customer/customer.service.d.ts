import { Model } from 'mongoose';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Customer } from "../interfaces/customer.interface";
import { ID } from '../interfaces/common.interface';
export declare class CustomerService {
    private readonly customerModel;
    constructor(customerModel: Model<Customer>);
    create(createCustomerDTO: CreateCustomerDTO): Promise<Customer>;
    update(id: ID, createCustomerDTO: CreateCustomerDTO): Promise<Customer>;
    delete(id: ID): Promise<any>;
    findAll(): Promise<Customer[]>;
    findOneById(id: ID): Promise<Customer>;
}
