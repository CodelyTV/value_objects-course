import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserRegistrar {
	constructor(private readonly repository: UserRepository) {}

	register(
		id: string,
		email: string,
		birthdate: Date,
		jobExperience: {
			company: string;
			title: string;
			startDate: Date;
			endDate: Date | null;
		}[]
	): void {
		const user = new User(id, email, birthdate, jobExperience);

		this.repository.save(user);
	}
}
