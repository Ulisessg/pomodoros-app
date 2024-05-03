export default class TableValidations {
	private table: string = "";
	constructor(table: string) {
		if (typeof table !== "string")
			throw new TypeError("Table name must be string");
		if (table.length < 3) throw new Error("Table name too short");
		this.table = table;
	}
	public validateName(
		name: string,
		maxNameSize: number,
		extraMessage: string,
		minSize: number = 1
	) {
		if (typeof name !== "string") {
			throw new ValidationTypeError(
				`Name String type required ${this.table} - ${extraMessage}`
			);
		}
		if (name.length < minSize) {
			throw new ValidationError(
				`Username empty ${this.table} - ${extraMessage}`
			);
		}
		if (name.length > maxNameSize) {
			throw new ValidationError(
				`Name Username length more than 30 ${this.table} - ${extraMessage}`
			);
		}
	}

	public validateId(id: number, extraMessage: string) {
		if (typeof id !== "number") {
			throw new ValidationTypeError(
				`Id number type required. ${this.table} - ${extraMessage}`
			);
		}
		if (isNaN(id)) {
			throw new ValidationError(
				`Id NaN not allowed as id. ${this.table} - ${extraMessage}`
			);
		}
		if (id < 0) {
			throw new ValidationError(`Id invalid. ${this.table} - ${extraMessage}`);
		}
	}
}

// Errors
export class ValidationError extends Error {
	constructor(message?: string, options?: ErrorOptions) {
		super(message, options);
	}
}

export class ValidationTypeError extends TypeError {
	constructor(message?: string, options?: ErrorOptions) {
		super(message, options);
	}
}
