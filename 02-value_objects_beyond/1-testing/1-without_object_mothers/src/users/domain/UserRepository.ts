import { User } from "./User";

export abstract class UserRepository {
	abstract save(user: User): void;
	abstract search(userEmail: string): User | null;
}
