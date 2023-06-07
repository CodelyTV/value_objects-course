import { DateValueObject } from "../../shared/domain/DateValueObject";
import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";

export class StartDate extends DateValueObject {
	constructor(readonly value: Date) {
		super(value);

		this.ensureIsValidStartDate(value);
	}

	ensureIsValidStartDate(value: Date): void {
		const currentDate = new Date();

		if (value > currentDate) {
			throw new InvalidArgumentError(`<${value.toString()}> is not a valid birthdate`);
		}
	}
}
