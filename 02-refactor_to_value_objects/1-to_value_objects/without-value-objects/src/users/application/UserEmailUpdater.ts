import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";
import { UserDoesNotExistError } from "../domain/UserDoesNotExistError";
import { UserRepository } from "../domain/UserRepository";

export class UserEmailUpdater {
	constructor(private readonly repository: UserRepository) {}

	update(oldEmail: string, newEmail: string): void {
		this.ensureEmailIsValid(oldEmail);

		const user = this.repository.search(oldEmail);

		if (!user) {
			throw new UserDoesNotExistError(oldEmail);
		}

		user.updateEmail(newEmail);
		this.repository.save(user);
	}

	ensureEmailIsValid(email: string): void {
		const validEmailRegExp =
			/^(?=.*[@](?:gmail\.com|hotmail\.com)$)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9_-]*$/;

		if (!validEmailRegExp.test(email)) {
			throw new InvalidArgumentError(`<${email}> is not a valid email`);
		}
	}
}
