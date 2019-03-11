export class CreateCustomerDTO {
	readonly firstName: string;
	readonly lastName: string;
	readonly email: string;
	readonly phone: string;
	readonly address: string;
	readonly description: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
}