export enum GenerationName {
	Silent,
	BabyBoomer,
	GenX,
	Millennial,
	GenZ,
	GenAlpha,
	Unknown,
}

export class Generation {
	private static readonly generationConfig = [
		{ generation: GenerationName.Silent, minYear: 1928, maxYear: 1945 },
		{ generation: GenerationName.BabyBoomer, minYear: 1946, maxYear: 1964 },
		{ generation: GenerationName.GenX, minYear: 1965, maxYear: 1980 },
		{ generation: GenerationName.Millennial, minYear: 1981, maxYear: 1996 },
		{ generation: GenerationName.GenZ, minYear: 1997, maxYear: 2012 },
		{ generation: GenerationName.GenAlpha, minYear: 2013 },
	];

	static from(year: Date): GenerationName {
		const birthYear = year.getFullYear();

		for (const config of this.generationConfig) {
			if (
				birthYear >= config.minYear &&
				(config.maxYear === undefined || birthYear <= config.maxYear)
			) {
				return config.generation;
			}
		}

		return GenerationName.Unknown;
	}
}
