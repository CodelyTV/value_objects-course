import { v4, validate } from "uuid";

import { InvalidArgumentError } from "./InvalidArgumentError";
import { ValueObject } from "./ValueObject";

export class Uuid extends ValueObject<string> {
	constructor(readonly value: string) {
		super(value);
		this.ensureIsValidUuid(value);
	}

	public static random(): Uuid {
		return new Uuid(v4());
	}

	private ensureIsValidUuid(id: string): void {
		if (!validate(id)) {
			throw new InvalidArgumentError(`<${id}> is not a valid <${this.constructor.name}>`);
		}
	}
}
