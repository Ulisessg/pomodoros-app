import Day, { IDay } from "./Day";

export default class DayBackend extends Day {
	public getDays(): Promise<IDay[]> {
		throw new Error("Method not implemented.");
	}
}
