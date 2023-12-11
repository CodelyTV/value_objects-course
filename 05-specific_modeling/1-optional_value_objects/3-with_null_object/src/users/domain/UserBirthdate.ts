import { DateValueObject } from "../../shared/domain/DateValueObject";
import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";

export class UserBirthdate extends DateValueObject {
	constructor(readonly value: Date) {
		super(value);

		this.ensureIsValidBirthdate(value);
	}

	toPrimitives(): Date {
		return this.value;
	}

	private ensureIsValidBirthdate(value: Date): void {
		const currentDate = new Date();
		let ageInYears = currentDate.getFullYear() - value.getFullYear();

		if (
			currentDate.getMonth() < value.getMonth() ||
			(currentDate.getMonth() === value.getMonth() && currentDate.getDate() < value.getDate())
		) {
			ageInYears--;
		}

		if (ageInYears < 18 || ageInYears > 110) {
			throw new InvalidArgumentError(`<${value.toString()}> is not a valid birthdate`);
		}
	}
}
