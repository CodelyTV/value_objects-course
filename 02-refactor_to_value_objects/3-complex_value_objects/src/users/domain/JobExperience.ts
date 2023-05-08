import { Company } from "./Company";
import { EndDate } from "./EndDate";
import { StartDate } from "./StartDate";
import { Title } from "./Title";

export class JobExperience {
	company: Company;
	title: Title;
	startDate: StartDate;
	endDate: EndDate | null;

	constructor(company: string, title: string, startDate: Date, endDate: Date | null) {
		this.company = new Company(company);
		this.title = new Title(title);
		this.startDate = new StartDate(startDate);
		this.endDate = endDate ? new EndDate(endDate) : null;
	}
}
