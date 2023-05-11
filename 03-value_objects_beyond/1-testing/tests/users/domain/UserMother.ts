import { User } from "../../../src/users/domain/User";
import { UserBirthdateMother } from "./UserBirthdate";
import { UserEmailMother } from "./UserEmail";
import { UserIdMother } from "./UserId";

interface UserParams {
	id: string;
	email: string;
	birthdate: Date;
}

export class UserMother {
	static create(params?: Partial<UserParams>): User {
		const defaultParams: UserParams = {
			id: UserIdMother.create().value,
			email: UserEmailMother.create().value,
			birthdate: UserBirthdateMother.create().value,
			...params,
		};

		return new User(defaultParams.id, defaultParams.email, defaultParams.birthdate);
	}
}
