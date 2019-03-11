export interface Student {
  id?: ID;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ID = string;
