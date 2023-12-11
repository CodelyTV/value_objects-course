import { InvalidArgumentError } from "../../../src/shared/domain/InvalidArgumentError";
import { UserRegistrar } from "../../../src/users/application/UserRegistrar";
import { InMemoryUserRepository } from "../../../src/users/infrastructure/InMemoryUserRepository";
import { UserMother } from "../domain/UserMother";

describe("UserRegistrar", () => {
	it("registers a user without throwing errors when all data is valid", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const user = UserMother.create();
		userRegistrar.register(user.idValue, user.emailValue, user.birthdateValue);

		expect(repositorySave).toHaveBeenCalledWith(user);
	});

	it("registers a user without throwing errors when all data is valid and birthday is null", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const user = UserMother.withoutBirthday();
		userRegistrar.register(user.idValue, user.emailValue, null);

		expect(repositorySave).toHaveBeenCalledWith(user);
	});

	it("throws an error when registering a user with an invalid uuid", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const user = UserMother.create();
		const invalidId = "patata";

		const register = () => userRegistrar.register(invalidId, user.emailValue, user.birthdateValue);

		expect(register).toThrow(InvalidArgumentError);
		expect(repositorySave).not.toHaveBeenCalled();
	});

	it("throws an error when registering a user with an invalid email", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const user = UserMother.create();
		const invalidEmail = "invalidemail";

		const register = () => userRegistrar.register(user.idValue, invalidEmail, user.birthdateValue);

		expect(register).toThrow(InvalidArgumentError);
		expect(repositorySave).not.toHaveBeenCalled();
	});

	it("throws an error when registering a user with an invalid email domain", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const user = UserMother.create();
		const invalidEmailDomain = "mail@invaliddomain.com";

		const register = () =>
			userRegistrar.register(user.idValue, invalidEmailDomain, user.birthdateValue);

		expect(register).toThrow(InvalidArgumentError);
		expect(repositorySave).not.toHaveBeenCalled();
	});

	it("throws an error when registering a user older than 110 years", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const user = UserMother.create();
		const invalidBirthdate = new Date();
		invalidBirthdate.setFullYear(invalidBirthdate.getFullYear() - 111);

		const register = () => userRegistrar.register(user.idValue, user.emailValue, invalidBirthdate);

		expect(register).toThrow(InvalidArgumentError);
		expect(repositorySave).not.toHaveBeenCalled();
	});

	it("throws an error when registering a user younger than 18 years", () => {
		const repository = new InMemoryUserRepository();
		const userRegistrar = new UserRegistrar(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const user = UserMother.create();
		const invalidBirthdate = new Date();
		invalidBirthdate.setFullYear(invalidBirthdate.getFullYear() - 18);
		invalidBirthdate.setMonth(11);
		invalidBirthdate.setDate(31);

		const currentDate = new Date();
		// If the test runs on January 1st, adjust the birthdate to make the user still 17 years old
		if (currentDate.getMonth() === 0 && currentDate.getDate() === 1) {
			invalidBirthdate.setFullYear(invalidBirthdate.getFullYear() - 1);
		}

		const register = () => userRegistrar.register(user.idValue, user.emailValue, invalidBirthdate);

		expect(register).toThrow(InvalidArgumentError);
		expect(repositorySave).not.toHaveBeenCalled();
	});
});
