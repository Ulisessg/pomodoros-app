import mariaDbPool from "@/databaseConnectors/mariaDbPool";
import Stage, { AddStagesParam, IStage } from "./Stage";
import { ValidationError } from "@/utils/tableValidations";

export default class StageBackend extends Stage {
	constructor() {
		super();
	}
	public async addStages(stages: AddStagesParam): Promise<IStage[]> {
		const connection = await mariaDbPool.getConnection();

		try {
			const stagesData = this.parseStagesDataToBatchQuery(stages);
			const batchResult = await connection.batch<IStage[]>(
				`INSERT INTO stages (id, name, color, project_id, stage_order) VALUES (?,?,?,?, ?) RETURNING id, name, color, project_id, stage_order`,
				stagesData
			);

			return batchResult;
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}

	public async updateWorkFlow(stages: IStage[]): Promise<void> {
		const connection = await mariaDbPool.getConnection();
		try {
			const stagesData = this.parseStagesDataToBatchQuery(stages);
			await connection.batch<IStage[]>(
				`INSERT INTO stages (id, name, color, project_id, stage_order) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE stage_order=VALUES(stage_order)
			`,
				stagesData
			);
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
	public updateStage(): Promise<any> {
		throw new Error("Method not implemented.");
	}
	public async deleteStage(): Promise<void> {
		this.validateId(this.id, "Stage id");
		const connection = await mariaDbPool.getConnection();
		try {
			await connection.query(`DELETE FROM stages WHERE stages.id = ?`, this.id);
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
	public async getStages(): Promise<IStage[]> {
		const connection = await mariaDbPool.getConnection();
		try {
			const stages: IStage[] = await connection.query(
				"SELECT * FROM stages WHERE stages.project_id = ? ORDER BY stage_order ASC",
				[this.project_id]
			);

			return stages;
		} catch (error) {
			throw error;
		} finally {
			await connection.end();
		}
	}
	private parseStagesDataToBatchQuery(
		// Allow stages list with or without id
		stages: IStage[] | AddStagesParam
	): StageArray {
		if (!Array.isArray(stages)) throw new TypeError("Stages must be in array");
		// Limit of Tiny int unsigned
		if (stages.length > 255) throw new RangeError("Stages qty not allowed");
		let errorInValidations: null | Error = null;
		const stagesData: StageArray = [];

		stages.some((stg, index) => {
			try {
				this.validateId(stg.project_id, "Stage backend, project_id");
				this.validateColor(stg.color);
				this.validateName(stg.name, 60, "Stage Backend, Stage name", 3);

				const stage: IStage = stg as IStage;
				const stageId: number = (() => {
					if (Number.isNaN(stage.id)) {
						return null as unknown as number;
					}
					return stage.id;
				})();

				if (!Number.isNaN(stageId)) {
					this.validateId(stg.project_id, "Stage backend, stage id");
				}

				stagesData.push([
					stageId,
					stg.name,
					stg.color,
					stg.project_id,
					stg.stage_order,
				]);

				return false;
			} catch (error) {
				errorInValidations = new ValidationError(
					`Error adding stages, stage with index ${index} caused`,
					{
						cause: error,
					}
				);
				return true;
			}
		});
		if (errorInValidations !== null) throw errorInValidations;

		return stagesData;
	}
}
// IStage keys into array
type StageArray = Array<[number, string, string, number, number]>;
