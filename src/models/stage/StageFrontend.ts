import { DeleteStageBody } from "@/app/api/stages/DELETE";
import Stage, { IStage } from "./Stage";
import { GetStagesResponse } from "@/app/api/stages/GET";
import axiosInstance from "@/utils/axiosInstance";

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
	public async deleteStage(): Promise<void> {
		this.validateId(this.id, "stage id");
		await axiosInstance.delete("/stages", {
			data: {
				stageId: this.id,
			} as DeleteStageBody,
		});
	}
	public addStages(): Promise<IStage[]> {
		throw new Error("Method not implemented.");
	}
	public async getStages(): Promise<IStage[]> {
		const stagesData = await axiosInstance.get<GetStagesResponse>("/stages", {
			params: {
				projectId: this.project_id,
			},
		});
		return stagesData.data.stages;
	}
	public async updateWorkFlow(stages: IStage[]): Promise<void> {
		(BigInt.prototype as any).toJSON = function () {
			return this.toString();
		};
		await axiosInstance.post("/stages", {
			stages,
		});
	}
}
