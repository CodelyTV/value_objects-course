import { validate } from "uuid";

import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";

export class User {
	constructor(public id: string, public email: string, public birthdate: Date) {
		this.ensureIdIsValid(id);
		this.ensureEmailIsValid(email);
		this.ensureBirthdateIsValid(birthdate);
	}

	ensureIdIsValid(id: string): void {
		if (!validate(id)) {
			throw new InvalidArgumentError(`<${id}> is not a valid UUID`);
		}
	}

	ensureEmailIsValid(email: string): void {
		const validEmailRegExp =
			/^(?=.*[@](?:gmail\.com|hotmail\.com)$)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9_-]*$/;

		if (!validEmailRegExp.test(email)) {
			throw new InvalidArgumentError(`<${email}> is not a valid email`);
		}
	}

	ensureBirthdateIsValid(birthdate: Date): void {
		const currentDate = new Date();
		let ageInYears = currentDate.getFullYear() - birthdate.getFullYear();

		if (
			currentDate.getMonth() < birthdate.getMonth() ||
			(currentDate.getMonth() === birthdate.getMonth() &&
				currentDate.getDate() < birthdate.getDate())
		) {
			ageInYears--;
		}

		if (ageInYears < 18 || ageInYears > 110) {
			throw new InvalidArgumentError(`<${birthdate.toISOString()}> is not a valid birthdate`);
		}
	}

	updateEmail(newEmail: string): void {
		this.ensureEmailIsValid(newEmail);
		this.email = newEmail;
	}
}
