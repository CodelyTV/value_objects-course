import { UserDoesNotExistError } from "../domain/UserDoesNotExistError";
import { UserEmail } from "../domain/UserEmail";
import { UserRepository } from "../domain/UserRepository";

export class UserEmailUpdater {
	constructor(private readonly repository: UserRepository) {}

	update(oldEmail: string, newEmail: string): void {
		const user = this.repository.search(new UserEmail(oldEmail));

		if (!user) {
			throw new UserDoesNotExistError(oldEmail);
		}

		user.updateEmail(newEmail);

		this.repository.save(user);
	}
}
