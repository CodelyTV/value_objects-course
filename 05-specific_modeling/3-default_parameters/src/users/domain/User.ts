import { UserBirthdate } from "./UserBirthdate";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";

export type UserPrimitives = {
	id: string;
	email: string;
	birthdate: Date | null;
};

export class User {
	constructor(
		private readonly id: UserId,
		private email: UserEmail,
		public birthdate: UserBirthdate = new UserBirthdate(new Date())
	) {}

	static create(id: string, email: string, birthdate: Date): User {
		return new User(new UserId(id), new UserEmail(email), new UserBirthdate(birthdate));
	}

	static fromPrimitives(primitives: UserPrimitives): User {
		return new User(
			new UserId(primitives.id),
			new UserEmail(primitives.email),
			primitives.birthdate !== null ? new UserBirthdate(primitives.birthdate) : null
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

	get birthdateValue(): Date | null {
		return this.birthdate !== null ? this.birthdate.value : null;
	}
}
