import { JobExperiences } from "./JobExperiences";
import { Generation, UserBirthdate } from "./UserBirthdate";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";

export class User {
	private email: UserEmail;
	private readonly id: UserId;
	private readonly birthdate: UserBirthdate;
	private readonly jobExperiences: JobExperiences;

	constructor(
		id: string,
		email: string,
		birthdate: Date,
		jobExperiences: {
			company: string;
			title: string;
			startDate: Date;
			endDate: Date | null;
		}[]
	) {
		this.id = new UserId(id);
		this.email = new UserEmail(email);
		this.birthdate = new UserBirthdate(birthdate);
		this.jobExperiences = new JobExperiences(jobExperiences);
	}

	get emailValue(): string {
		return this.email.value;
	}

	updateEmail(newEmail: string): void {
		this.email = new UserEmail(newEmail);
	}

	generation(): Generation {
		return this.birthdate.generation();
	}
}
