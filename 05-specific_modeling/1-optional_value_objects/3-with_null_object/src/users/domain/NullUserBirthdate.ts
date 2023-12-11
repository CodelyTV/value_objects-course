import { UserBirthdate } from "./UserBirthdate";

export class NullUserBirthdate implements UserBirthdate {
	toPrimitives(): Date {
		return new Date("1993-06-26");
	}
}
