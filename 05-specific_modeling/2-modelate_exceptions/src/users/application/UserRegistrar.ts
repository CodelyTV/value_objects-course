import { User } from "../domain/User";
import { UserAlreadyExistError } from "../domain/UserAlreadyExistError";
import { UserEmail } from "../domain/UserEmail";
import { UserRepository } from "../domain/UserRepository";

export class UserRegistrar {
	constructor(private readonly repository: UserRepository) {}

	register(id: string, email: string, birthdate: Date | null): void {
		this.ensureUserDoesNotExist(email);

		const user = User.create(id, email, birthdate);

		this.repository.save(user);
	}

	private ensureUserDoesNotExist(email: string): void {
		if (this.repository.search(new UserEmail(email))) {
			throw new UserAlreadyExistError(email);
		}
	}
}
