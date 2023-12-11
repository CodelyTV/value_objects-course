import { Maybe } from "../../shared/domain/Maybe";
import { UserBirthdate } from "./UserBirthdate";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";

export type UserPrimitives = {
	id: string;
	email: string;
	birthdate: Maybe<Date>;
};

export class User {
	constructor(
		private readonly id: UserId,
		private email: UserEmail,
		private readonly birthdate: Maybe<UserBirthdate>
	) {}

	static create(id: string, email: string, birthdate: Maybe<Date>): User {
		return new User(
			new UserId(id),
			new UserEmail(email),
			birthdate.map((date) => new UserBirthdate(date))
		);
	}

	static fromPrimitives(primitives: UserPrimitives): User {
		return new User(
			new UserId(primitives.id),
			new UserEmail(primitives.email),
			primitives.birthdate.map((date) => new UserBirthdate(date))
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

	get birthdateValue(): Maybe<Date> {
		return this.birthdate.map((date) => date.value);
	}
}
