import mariaDbPool from "@/databaseConnectors/mariaDbPool";
import Stage, { AddStagesParam, IStage } from "./Stage";

export default class StageBackend extends Stage {
	constructor() {
		super();
	}
	public async addStages(stages: AddStagesParam): Promise<IStage[]> {
		let errorInValidations: null | Error = null;
		const stagesData: StageArray = [];
		stages.some((stg, index) => {
			try {
				this.validateId(stg.project_id);
				this.validateColor(stg.color);
				this.validateName(stg.name);
				// Verify whether the order of array values matches the order in the insertion script
				stagesData.push([
					null as unknown as number,
					stg.name,
					stg.color,
					stg.project_id,
				]);
				return false;
			} catch (error) {
				errorInValidations = new Error(
					`Error adding stages, stage with index ${index} caused`,
					{
						cause: error,
					}
				);
				return true;
			}
		});
		if (errorInValidations !== null) throw errorInValidations;

		const connection = await mariaDbPool.getConnection();

		try {
			const batchResult = await connection.batch<IStage[]>(
				`INSERT INTO stages (id, name, color, project_id) VALUES (?,?,?,?) RETURNING id,name, color, project_id`,
				stagesData
			);

			return batchResult;
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
	public updateStage(): Promise<any> {
		throw new Error("Method not implemented.");
	}
	public deleteStage(): Promise<any> {
		throw new Error("Method not implemented.");
	}
	public async getStages(): Promise<IStage[]> {
		const connection = await mariaDbPool.getConnection();
		try {
			const stages: IStage[] = await connection.query(
				"SELECT * FROM stages WHERE stages.project_id = ?",
				[this.project_id]
			);
			return stages;
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
}
// IStage keys into array
type StageArray = Array<[number, string, string, number]>;
