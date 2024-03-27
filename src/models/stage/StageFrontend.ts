import axios from "axios";
import Stage, { IStage } from "./Stage";
import { GetStagesResponse } from "@/app/api/stages/GET";

export default class StageFrontend extends Stage {
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
	public addStages(): Promise<IStage[]> {
		throw new Error("Method not implemented.");
	}
	public async getStages(): Promise<IStage[]> {
		const stagesData = await axios.get<GetStagesResponse>("/api/stages", {
			params: {
				projectId: this.project_id,
			},
		});
		return stagesData.data.stages;
	}
}
