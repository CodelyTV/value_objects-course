export class UserAlreadyExistError extends Error {
	constructor(readonly email: string) {
		super(`The user ${email} already exist`);
	}
}
