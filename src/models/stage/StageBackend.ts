import Stage, { IStages } from "./Stage";

export default class StageBackend extends Stage {
	constructor() {
		super();
	}
	public addStage(): Promise<any> {
		throw new Error("Method not implemented.");
	}
	public updateStage(): Promise<any> {
		throw new Error("Method not implemented.");
	}
	public deleteStage(): Promise<any> {
		throw new Error("Method not implemented.");
	}
	public getStages(): Promise<IStages[]> {
		throw new Error("Method not implemented.");
	}
}
