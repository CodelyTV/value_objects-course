import { InvalidArgumentError } from "../../../src/shared/domain/InvalidArgumentError";
import { UserEmailUpdater } from "../../../src/users/application/UserEmailUpdater";
import { User } from "../../../src/users/domain/User";
import { UserDoesNotExistError } from "../../../src/users/domain/UserDoesNotExistError";
import { InMemoryUserRepository } from "../../../src/users/infrastructure/InMemoryUserRepository";
import { UserEmailMother } from "../domain/UserEmail";
import { UserMother } from "../domain/UserMother";

describe("UserRegistrar", () => {
	it("registers a user without throwing errors when all data is valid", () => {
		const repository = new InMemoryUserRepository();
		const userEmailUpdater = new UserEmailUpdater(repository);

		const user = UserMother.create();
		const newEmail = UserEmailMother.create();
		repository.save(user);

		const repositorySave = jest.spyOn(repository, "save");

		userEmailUpdater.update(user.emailValue, newEmail.value);

		expect(repositorySave).toHaveBeenCalledWith(
			new User(user.idValue, newEmail.value, user.birthdateValue)
		);
	});

	it("throws an error if the user does not exist", () => {
		const repository = new InMemoryUserRepository();
		const userEmailUpdater = new UserEmailUpdater(repository);
		const repositorySave = jest.spyOn(repository, "save");

		const user = UserMother.create();
		const newEmail = UserEmailMother.create();

		const updateEmail = () => userEmailUpdater.update(user.emailValue, newEmail.value);

		expect(updateEmail).toThrow(UserDoesNotExistError);
		expect(repositorySave).not.toHaveBeenCalled();
	});

	it("throws an error if the new email is invalid", () => {
		const repository = new InMemoryUserRepository();
		const userEmailUpdater = new UserEmailUpdater(repository);

		const user = UserMother.create();
		const invalidNewEmail = "newemail@invalid.com";
		repository.save(user);
		const repositorySave = jest.spyOn(repository, "save");

		const updateEmail = () => userEmailUpdater.update(user.emailValue, invalidNewEmail);

		expect(updateEmail).toThrow(InvalidArgumentError);
		expect(repositorySave).not.toHaveBeenCalled();
	});
});
