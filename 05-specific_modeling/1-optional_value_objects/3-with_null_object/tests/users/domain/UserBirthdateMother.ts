import { faker } from "@faker-js/faker";

import { NullUserBirthdate } from "../../../src/users/domain/NullUserBirthdate";
import { RealUserBirthdate } from "../../../src/users/domain/RealUserBirthdate";

export class UserBirthdateMother {
	static create(value?: Date): RealUserBirthdate {
		return new RealUserBirthdate(value ?? faker.date.birthdate({ mode: "age", min: 18, max: 110 }));
	}

	static null(): NullUserBirthdate {
		return new NullUserBirthdate();
	}
}
