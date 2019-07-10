export class CreateUserDTO {
	readonly firstName: string;
	readonly lastName: string;
	readonly email: string;
	readonly phone: string;
	readonly group: string;
	readonly description: string;
	password: string;
  hash: string;
}