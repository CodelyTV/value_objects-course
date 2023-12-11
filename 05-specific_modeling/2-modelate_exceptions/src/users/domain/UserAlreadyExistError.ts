export class UserAlreadyExistError extends Error {
	message = `The user ${this.email} already exist`;

	constructor(readonly email: string) {
		super();
	}
}
