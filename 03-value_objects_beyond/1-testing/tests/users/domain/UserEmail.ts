import { faker } from "@faker-js/faker";

import { UserEmail } from "../../../src/users/domain/UserEmail";

export class UserEmailMother {
	static create(value?: string): UserEmail {
		const domains = ["gmail.com", "hotmail.com"];
		const randomDomain = domains[Math.floor(Math.random() * domains.length)];

		return new UserEmail(
			value ?? faker.internet.email(faker.name.firstName(), faker.name.lastName(), randomDomain)
		);
	}
}
