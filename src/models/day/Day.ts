export default abstract class Day {
	public abstract getDays(): Promise<Array<IDay>>;
}

export interface IDay {
	id: number;
	name: string;
}
