import { Document } from 'mongoose';

export interface User extends Document {
    id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly phone: string;
    readonly group: string;
    readonly description: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly password: string;
}