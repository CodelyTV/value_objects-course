import { v4 } from "uuid";

import { InvalidArgumentError } from "../src/shared/domain/InvalidArgumentError";
import { UserRegistrar } from "../src/users/application/UserRegistrar";
import { User } from "../src/users/domain/User";
import { InMemoryUserRepository } from "../src/users/infrastructure/InMemoryUserRepository";

const validEmail = "validemail@gmail.com";
const validId = v4();
const currentDate = new Date();
const validBirthdate = new Date(
	currentDate.getFullYear() - 50,
	currentDate.getMonth(),
	currentDate.getDate()
);
const validJobExperience = [
	{
		title: "Job title",
		company: "Company",
		startDate: new Date("2020-01-01"),
		endDate: new Date("2022-01-01"),
	},
];

describe("UserRegistrar", () => {
	it("registers a user without throwing errors when all data is valid", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		userRegistrar.register(validId, validEmail, validBirthdate, validJobExperience);

		expect(repositorySave).toHaveBeenCalledWith(
			new User(validId, validEmail, validBirthdate, validJobExperience)
		);
	});

	it("throws an error when registering a user with an invalid uuid", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const invalidId = "patata";

		const register = () =>
			userRegistrar.register(invalidId, validEmail, validBirthdate, validJobExperience);

		expect(register).toThrow(InvalidArgumentError);
		expect(repositorySave).not.toHaveBeenCalled();
	});

	it("throws an error when registering a user with an invalid email", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const invalidEmail = "invalidemail";

		const register = () =>
			userRegistrar.register(validId, invalidEmail, validBirthdate, validJobExperience);

		expect(register).toThrow(InvalidArgumentError);
		expect(repositorySave).not.toHaveBeenCalled();
	});

	it("throws an error when registering a user with an invalid email domain", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const invalidEmailDomain = "mail@invaliddomain.com";

		const register = () =>
			userRegistrar.register(validId, invalidEmailDomain, validBirthdate, validJobExperience);

		expect(register).toThrow(InvalidArgumentError);
		expect(repositorySave).not.toHaveBeenCalled();
	});

	it("throws an error when registering a user older than 110 years", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const invalidBirthdate = new Date();
		invalidBirthdate.setFullYear(invalidBirthdate.getFullYear() - 111);

		const register = () =>
			userRegistrar.register(validId, validEmail, invalidBirthdate, validJobExperience);

		expect(register).toThrow(InvalidArgumentError);
		expect(repositorySave).not.toHaveBeenCalled();
	});

	it("throws an error when registering a user younger than 18 years", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const invalidBirthdate = new Date();
		invalidBirthdate.setFullYear(invalidBirthdate.getFullYear() - 18);
		invalidBirthdate.setMonth(11);
		invalidBirthdate.setDate(31);

		const currentDate = new Date();
		// If the test runs on January 1st, adjust the birthdate to make the user still 17 years old
		if (currentDate.getMonth() === 0 && currentDate.getDate() === 1) {
			invalidBirthdate.setFullYear(invalidBirthdate.getFullYear() - 1);
		}

		const register = () =>
			userRegistrar.register(validId, validEmail, invalidBirthdate, validJobExperience);

		expect(register).toThrow(InvalidArgumentError);
		expect(repositorySave).not.toHaveBeenCalled();
	});

	it("throws an error when registering a user with a job experience that has a startDate later than the current Date", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const currentDate = new Date();
		const invalidStartDate = new Date(currentDate.getFullYear() + 1, 0, 1);

		const invalidJobExperience = [
			{
				...validJobExperience[0],
				startDate: invalidStartDate,
			},
		];

		const register = () =>
			userRegistrar.register(validId, validEmail, validBirthdate, invalidJobExperience);

		expect(register).toThrow(InvalidArgumentError);
		expect(repositorySave).not.toHaveBeenCalled();
	});

	it("throws an error when registering a user with a job experience with an end date that is earlier than the start date", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const currentDate = new Date();
		const startDate = new Date(currentDate.getFullYear() - 1, 0, 1);
		const endDate = new Date(currentDate.getFullYear() - 2, 0, 1);

		const invalidJobExperience = [
			{
				...validJobExperience[0],
				startDate,
				endDate,
			},
		];

		const register = () =>
			userRegistrar.register(validId, validEmail, validBirthdate, invalidJobExperience);

		expect(register).toThrow(InvalidArgumentError);
		expect(repositorySave).not.toHaveBeenCalled();
	});
});
