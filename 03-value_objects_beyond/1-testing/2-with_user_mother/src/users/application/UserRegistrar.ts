import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserRegistrar {
	constructor(private readonly repository: UserRepository) {}

	register(id: string, email: string, birthdate: Date): void {
		const user = new User(id, email, birthdate);

		this.repository.save(user);
	}
}
