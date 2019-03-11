import { CustomerService } from './customer.service';
import { ID } from '../interfaces/common.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Customer } from "../interfaces/customer.interface";
export declare class CustomerResolver {
    private readonly customerService;
    constructor(customerService: CustomerService);
    getCustomers(): Promise<Customer[]>;
    customer(_id: ID): Promise<Customer>;
    create(args: CreateCustomerDTO): Promise<Customer>;
    customerCreated(): {
        subscribe: () => any;
    };
}
