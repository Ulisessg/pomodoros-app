import { Tables } from "@/Types";
import { HexColorRegex } from "@/utils/regex";
import TableValidations from "../TableValidations";

const table: Tables = "stages";

export default abstract class Stage extends TableValidations implements IStage {
	private _id: number = NaN;
	private _name: string = "";
	private _color: string = "";
	private _project_id: number = NaN;
	private _stage_order: number = NaN;

	constructor() {
		super(table);
	}

	public get stage_order(): number {
		return this._stage_order;
	}
	public set stage_order(value: number) {
		this.validateId(value, "stage_order");
		this._stage_order = value;
	}

	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this.validateId(value, "Stage id");
		this._id = value;
	}
	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this._name = value;
	}
	public get color(): string {
		return this._color;
	}
	public set color(value: string) {
		const colorUpperCase = this.validateColor(value);
		this._color = colorUpperCase;
	}
	public get project_id(): number {
		return this._project_id;
	}
	public set project_id(value: number) {
		this.validateId(value, "project_id");
		this._project_id = value;
	}

	public validateColor(col?: string): string {
		const color = col || this.color;

		this.validateName(color, 6, "color", 6);

		const colorUpperCase = color.toUpperCase();

		if (colorUpperCase.match(HexColorRegex) === null) {
			throw new Error(
				`Invalid CSS color ${colorUpperCase}. Pattern ${HexColorRegex}`
			);
		}
		return colorUpperCase;
	}

	// eslint-disable-next-line no-unused-vars
	public abstract addStages(stages: AddStagesParam): Promise<IStage[]>;
	public abstract updateStage(): Promise<any>;
	public abstract deleteStage(): Promise<void>;
	public abstract getStages(): Promise<Array<IStage>>;
	// eslint-disable-next-line no-unused-vars
	public abstract updateWorkFlow(stages: IStage[]): Promise<void>;
}

export interface IStage {
	id: number;
	name: string;
	color: string;
	project_id: number;
	stage_order: number;
}

export type AddStagesParam = Array<Omit<IStage, "id">>;
