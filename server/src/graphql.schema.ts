/* tslint:disable */
export class CreateCustomerInput {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    description?: string;
}

export class Customer {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export abstract class IMutation {
    abstract createCustomer(createCustomerInput: CreateCustomerInput): Customer | Promise<Customer>;

    abstract updateCustomer(_id: string, createCustomerInput?: CreateCustomerInput): Customer | Promise<Customer>;

    abstract deleteCustomer(_id: string): Customer | Promise<Customer>;
}

export abstract class IQuery {
    abstract getCustomers(): Customer[] | Promise<Customer[]>;

    abstract customer(_id: string): Customer | Promise<Customer>;

    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract customerCreated(): Customer | Promise<Customer>;
}

export type Date = any;
