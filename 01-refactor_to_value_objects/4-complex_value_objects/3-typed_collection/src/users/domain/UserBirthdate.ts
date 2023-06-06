import { DateValueObject } from "../../shared/domain/DateValueObject";
import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";

export enum Generation {
	Silent,
	BabyBoomer,
	GenX,
	Millennial,
	GenZ,
	GenAlpha,
	Unknown,
}

export class UserBirthdate extends DateValueObject {
	private readonly generationConfig = [
		{ generation: Generation.Silent, minYear: 1928, maxYear: 1945 },
		{ generation: Generation.BabyBoomer, minYear: 1946, maxYear: 1964 },
		{ generation: Generation.GenX, minYear: 1965, maxYear: 1980 },
		{ generation: Generation.Millennial, minYear: 1981, maxYear: 1996 },
		{ generation: Generation.GenZ, minYear: 1997, maxYear: 2012 },
		{ generation: Generation.GenAlpha, minYear: 2013 },
	];

	constructor(readonly value: Date) {
		super(value);

		this.ensureIsValidBirthdate(value);
	}

	toPrimitives(): Date {
		return this.value;
	}

	generation(): Generation {
		const birthYear = this.value.getFullYear();

		for (const config of this.generationConfig) {
			if (
				birthYear >= config.minYear &&
				(config.maxYear === undefined || birthYear <= config.maxYear)
			) {
				return config.generation;
			}
		}

		return Generation.Unknown;
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
