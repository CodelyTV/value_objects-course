export class UserDoesNotExistError extends Error {
	constructor(public readonly email: string) {
		super(`The user ${email} does not exist`);
	}
}
