import { ValueObject } from "./ValueObject";

export class DateValueObject extends ValueObject<Date> {
	constructor(readonly value: Date) {
		super(value);
	}

	toString(): string {
		return this.value.toISOString();
	}
}
