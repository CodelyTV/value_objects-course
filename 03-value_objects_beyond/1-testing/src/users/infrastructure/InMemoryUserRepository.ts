import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class InMemoryUserRepository implements UserRepository {
	private readonly users: User[] = [];

	save(user: User): void {
		this.users.push(user);
	}

	search(userEmail: string): User | null {
		return this.users.find((user) => user.email === userEmail) ?? null;
	}
}
