import { faker } from "@faker-js/faker";

import { UserBirthdate } from "../../../src/users/domain/UserBirthdate";

export class UserBirthdateMother {
	static create(value?: Date): UserBirthdate {
		return new UserBirthdate(value ?? faker.date.birthdate({ mode: "age", min: 18, max: 110 }));
	}
}
