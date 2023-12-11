import { DateValueObject } from "../../shared/domain/DateValueObject";
import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";
import { UserBirthdate } from "./UserBirthdate";

export class RealUserBirthdate extends DateValueObject implements UserBirthdate {
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
