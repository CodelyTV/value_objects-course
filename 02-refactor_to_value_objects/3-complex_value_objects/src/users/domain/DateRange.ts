import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";
import { EndDate } from "./EndDate";
import { StartDate } from "./StartDate";

export class DateRange {
	startDate: StartDate;
	endDate: EndDate | null;

	constructor(startDate: Date, endDate: Date | null) {
		this.startDate = new StartDate(startDate);
		this.endDate = endDate ? new EndDate(endDate) : null;

		this.ensureDateRangeIsValid(this.startDate, this.endDate);
	}

	private ensureDateRangeIsValid(startDate: StartDate, endDate: EndDate | null) {
		if (endDate === null) {
			return;
		}

		if (startDate > endDate) {
			throw new InvalidArgumentError(
				`<${startDate.toString()}-${endDate.toString()}> is not a valid <${this.constructor.name}>`
			);
		}
	}
}
