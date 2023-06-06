export class UserDoesNotExistError extends Error {
	message = `The user ${this.email} does not exist`;

	constructor(readonly email: string) {
		super();
	}
}
