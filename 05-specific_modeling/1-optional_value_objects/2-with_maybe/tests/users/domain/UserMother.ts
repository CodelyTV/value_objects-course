import { Maybe } from "../../../src/shared/domain/Maybe";
import { User, UserPrimitives } from "../../../src/users/domain/User";
import { UserBirthdateMother } from "./UserBirthdateMother";
import { UserEmailMother } from "./UserEmailMother";
import { UserIdMother } from "./UserIdMother";

export class UserMother {
	static create(params?: Partial<UserPrimitives>): User {
		const primitives: UserPrimitives = {
			id: UserIdMother.create().value,
			email: UserEmailMother.create().value,
			birthdate: Maybe.some(UserBirthdateMother.create().value),
			...params,
		};

		return User.fromPrimitives(primitives);
	}

	static withoutBirthday(): User {
		return this.create({ birthdate: Maybe.none() });
	}
}
