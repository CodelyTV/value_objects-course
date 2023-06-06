import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";
import { JobExperience } from "./JobExperience";

export class JobExperiences {
	public readonly value: JobExperience[];

	constructor(
		experiences: {
			company: string;
			title: string;
			startDate: Date;
			endDate: Date | null;
		}[]
	) {
		const jobExperiences = experiences.map(
			(_) => new JobExperience(_.company, _.title, _.startDate, _.endDate)
		);

		this.ensureNoOverlappingExperiences(jobExperiences);

		this.value = jobExperiences;
	}

	private ensureNoOverlappingExperiences(experiences: JobExperience[]) {
		const sortedExperiences = experiences.sort(
			(a, b) => a.startDate.getTime() - b.startDate.getTime()
		);

		for (let i = 0; i < sortedExperiences.length - 1; i++) {
			const currentExperience = sortedExperiences[i];
			const nextExperience = sortedExperiences[i + 1];

			if (!currentExperience.endDate) {
				continue;
			}

			if (
				(currentExperience.endDate.getTime() ?? new Date().getTime()) >
				nextExperience.startDate.getTime()
			) {
				throw new InvalidArgumentError(
					`The job experience at ${
						currentExperience.company.value
					} from ${currentExperience.startDate.toString()} to ${currentExperience.endDate.toString()} overlaps with the job experience at ${
						nextExperience.company.value
					} from ${nextExperience.startDate.toString()} to ${
						nextExperience.endDate?.toString() ?? ""
					}`
				);
			}
		}
	}
}
