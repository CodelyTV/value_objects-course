import { User } from "./User";
import { UserEmail } from "./UserEmail";

export abstract class UserRepository {
	abstract save(user: User): void;
	abstract search(userEmail: UserEmail): User | null;
}
