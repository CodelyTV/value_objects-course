import { ValueObject } from "./ValueObject";

export class DateValueObject extends ValueObject<Date> {
	toString(): string {
		return this.value.toISOString();
	}
}
