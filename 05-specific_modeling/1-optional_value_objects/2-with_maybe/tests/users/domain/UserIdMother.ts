import { faker } from "@faker-js/faker";

import { UserId } from "../../../src/users/domain/UserId";

export class UserIdMother {
	static create(value?: string): UserId {
		return new UserId(value ?? faker.datatype.uuid());
	}
}
