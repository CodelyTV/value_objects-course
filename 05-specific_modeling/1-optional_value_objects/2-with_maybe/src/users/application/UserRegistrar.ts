import { Maybe } from "../../shared/domain/Maybe";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserRegistrar {
	constructor(private readonly repository: UserRepository) {}

	register(id: string, email: string, birthdate: Maybe<Date>): void {
		const user = User.create(id, email, birthdate);

		this.repository.save(user);
	}
}
