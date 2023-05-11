import { faker } from "@faker-js/faker";

import { User } from "../../../src/users/domain/User";

interface UserParams {
	id: string;
	email: string;
	birthdate: Date;
}

export class UserMother {
	static create(params?: Partial<UserParams>): User {
		const domains = ["gmail.com", "hotmail.com"];
		const randomDomain = domains[Math.floor(Math.random() * domains.length)];

		const defaultParams: UserParams = {
			id: faker.datatype.uuid(),
			email: faker.internet.email(faker.name.firstName(), faker.name.lastName(), randomDomain),
			birthdate: faker.date.birthdate({ mode: "age", min: 18, max: 110 }),
			...params,
		};

		return new User(defaultParams.id, defaultParams.email, defaultParams.birthdate);
	}
}
