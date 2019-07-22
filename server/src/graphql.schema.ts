/* tslint:disable */
export class CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    group: string;
    description?: string;
    password: string;
    avatarUrl?: string;
    role?: string;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): Token | Promise<Token>;

    abstract updateUser(_id: string, createUserInput?: CreateUserInput): User | Promise<User>;

    abstract deleteUser(_id: string): User | Promise<User>;
}

export abstract class IQuery {
    abstract getUsers(): User[] | Promise<User[]>;

    abstract user(_id: string): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract userCreated(): User | Promise<User>;
}

export class Token {
    expires_in?: string;
    access_token?: string;
    status?: number;
}

export class User {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    group?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Date = any;
