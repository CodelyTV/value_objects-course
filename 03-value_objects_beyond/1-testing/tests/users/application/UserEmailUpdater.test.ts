import { v4 } from "uuid";

import { InvalidArgumentError } from "../../../src/shared/domain/InvalidArgumentError";
import { UserEmailUpdater } from "../../../src/users/application/UserEmailUpdater";
import { User } from "../../../src/users/domain/User";
import { UserDoesNotExistError } from "../../../src/users/domain/UserDoesNotExistError";
import { InMemoryUserRepository } from "../../../src/users/infrastructure/InMemoryUserRepository";

const validId = v4();
const currentDate = new Date();
const validBirthdate = new Date(
	currentDate.getFullYear() - 50,
	currentDate.getMonth(),
	currentDate.getDate()
);

describe("UserRegistrar", () => {
	it("registers a user without throwing errors when all data is valid", () => {
		const repository = new InMemoryUserRepository();
		const userEmailUpdater = new UserEmailUpdater(repository);

		const oldEmail = "oldemail@gmail.com";
		const newEmail = "newemail@gmail.com";
		repository.save(new User(validId, oldEmail, validBirthdate));

		const repositorySave = jest.spyOn(repository, "save");

		userEmailUpdater.update(oldEmail, newEmail);

		expect(repositorySave).toHaveBeenCalledWith(new User(validId, newEmail, validBirthdate));
	});

	it("throws an error if the user does not exist", () => {
		const repository = new InMemoryUserRepository();
		const userEmailUpdater = new UserEmailUpdater(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const oldEmail = "oldemail@gmail.com";
		const newEmail = "newemail@gmail.com";

		const updateEmail = () => userEmailUpdater.update(oldEmail, newEmail);

		expect(updateEmail).toThrow(UserDoesNotExistError);
		expect(repositorySave).not.toHaveBeenCalled();
	});

	it("throws an error if the new email is invalid", () => {
		const repository = new InMemoryUserRepository();
		const userEmailUpdater = new UserEmailUpdater(repository);

		const oldEmail = "oldemail@gmail.com";
		const invalidNewEmail = "newemail@invalid.com";
		repository.save(new User(validId, oldEmail, validBirthdate));
		const repositorySave = jest.spyOn(repository, "save");

		const updateEmail = () => userEmailUpdater.update(oldEmail, invalidNewEmail);

		expect(updateEmail).toThrow(InvalidArgumentError);
		expect(repositorySave).not.toHaveBeenCalled();
	});
});
