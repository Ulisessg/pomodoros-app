import { Tables } from "@/Types";
import { HexColorRegex } from "@/utils/regex";
import { idValidations, nameValidations } from "@/utils/tableValidations";

const table: Tables = "stages";

export default abstract class Stage implements IStages {
	private _id: number = NaN;
	private _name: string = "";
	private _color: string = "";
	private _project_id: number = NaN;

	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		idValidations({
			id: value,
			table,
		});
		this._id = value;
	}
	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		nameValidations({
			maxNameSize: 50,
			name: value,
			table,
		});
		this._name = value;
	}
	public get color(): string {
		return this._color;
	}
	public set color(value: string) {
		nameValidations({
			maxNameSize: 6,
			name: value,
			table,
			extraMessage: "Color name",
		});

		const valueUpperCase = value.toUpperCase();
		if (valueUpperCase.match(HexColorRegex) === null) {
			throw new Error(
				`Invalid CSS color ${valueUpperCase}. Pattern ${HexColorRegex}`
			);
		}

		this._color = valueUpperCase;
	}
	public get project_id(): number {
		return this._project_id;
	}
	public set project_id(value: number) {
		idValidations({
			id: value,
			table,
			extraMessage: "project_id",
		});
		this._project_id = value;
	}

	public abstract addStage(): Promise<any>;
	public abstract updateStage(): Promise<any>;
	public abstract deleteStage(): Promise<any>;
	public abstract getStages(): Promise<Array<IStages>>;
}

export interface IStages {
	id: number;
	name: string;
	color: string;
	project_id: number;
}
