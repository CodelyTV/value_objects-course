import { UserBirthdate } from "./UserBirthdate";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";

export type UserPrimitives = {
	id: string;
	email: string;
	birthdate: Date;
};

export class User {
	constructor(
		private readonly id: UserId,
		private email: UserEmail,
		private readonly birthdate: UserBirthdate
	) {}

	static create(id: string, email: string, birthdate: Date): User {
		return new User(new UserId(id), new UserEmail(email), new UserBirthdate(birthdate));
	}

	static fromPrimitives(primitives: UserPrimitives): User {
		return new User(
			new UserId(primitives.id),
			new UserEmail(primitives.email),
			new UserBirthdate(primitives.birthdate)
		);
	}

	updateEmail(newEmail: string): void {
		this.email = new UserEmail(newEmail);
	}

	get idValue(): string {
		return this.id.value;
	}

	get emailValue(): string {
		return this.email.value;
	}

	get birthdateValue(): Date {
		return this.birthdate.value;
	}
}
