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

export class SettingsInput {
    lang: string;
    theme: string;
}

export class Code {
    _id?: string;
    code: string;
    user: string;
    name: string;
    result?: string;
    lang: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Ide {
    settings?: Settings;
}

export abstract class IMutation {
    abstract updateSettings(settings: SettingsInput, idUser: string): Settings | Promise<Settings>;

    abstract saveCode(code: string, idUser: string, name: string, lang: string): Code | Promise<Code>;

    abstract createUser(createUserInput: CreateUserInput): Token | Promise<Token>;

    abstract updateUser(_id: string, createUserInput?: CreateUserInput): User | Promise<User>;

    abstract deleteUser(_id: string): User | Promise<User>;
}

export abstract class IQuery {
    abstract settings(user: string): Settings | Promise<Settings>;

    abstract listCodeUser(user: string): Code[] | Promise<Code[]>;

    abstract getUsers(): User[] | Promise<User[]>;

    abstract user(_id: string): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class Settings {
    lang: string;
    theme: string;
}

export abstract class ISubscription {
    abstract userCreated(): User | Promise<User>;
}

export class Token {
    expires_in?: string;
    code_student_token?: string;
    status?: number;
}

export class User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    group: string;
    description?: string;
    avatarUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Date = any;
