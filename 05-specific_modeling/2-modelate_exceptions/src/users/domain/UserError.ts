export class UserAlreadyExistError extends Error {
	constructor(public readonly email: string) {
		super(`The user ${email} already exist`);
	}
}
