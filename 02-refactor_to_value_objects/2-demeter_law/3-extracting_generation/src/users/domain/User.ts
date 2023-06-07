import { Generation, UserBirthdate } from "./UserBirthdate";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";

export class User {
	private email: UserEmail;
	private readonly id: UserId;
	private readonly birthdate: UserBirthdate;

	constructor(id: string, email: string, birthdate: Date) {
		this.id = new UserId(id);
		this.email = new UserEmail(email);
		this.birthdate = new UserBirthdate(birthdate);
	}

	get emailValue(): string {
		return this.email.value;
	}

	updateEmail(newEmail: string): void {
		this.email = new UserEmail(newEmail);
	}

	generation(): Generation {
		return this.birthdate.generation();
	}
}
