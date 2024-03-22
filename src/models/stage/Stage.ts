import { Tables } from "@/Types";
import { HexColorRegex } from "@/utils/regex";
import { idValidations, nameValidations } from "@/utils/tableValidations";

const table: Tables = "stages";

export default abstract class Stage implements IStage {
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
		this.validateId(value);
		this._project_id = value;
	}

	// Validations
	public validateId(newId?: number) {
		const id = newId || this.id;
		idValidations({
			id: id,
			table,
		});
	}

	public validateColor(col?: string): string {
		const color = col || this.color;

		nameValidations({
			maxNameSize: 6,
			name: color,
			table,
			extraMessage: "Color name",
		});

		const colorUpperCase = color.toUpperCase();

		if (colorUpperCase.match(HexColorRegex) === null) {
			throw new Error(
				`Invalid CSS color ${colorUpperCase}. Pattern ${HexColorRegex}`
			);
		}
		return colorUpperCase;
	}

	public validateName(nName?: string) {
		const name = nName || this.name;
		nameValidations({
			maxNameSize: 50,
			name: name,
			table,
		});
	}

	// eslint-disable-next-line no-unused-vars
	public abstract addStages(stages: AddStagesParam): Promise<IStage[]>;
	public abstract updateStage(): Promise<any>;
	public abstract deleteStage(): Promise<any>;
	public abstract getStages(): Promise<Array<IStage>>;
}

export interface IStage {
	id: number;
	name: string;
	color: string;
	project_id: number;
}

export type AddStagesParam = Array<Omit<IStage, "id">>;
