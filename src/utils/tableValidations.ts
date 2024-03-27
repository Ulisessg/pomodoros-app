import { Tables } from "@/Types";

/**
 * @deprecated - Deprecated: Use this functions is no longer recommended, instead extend classes using TableValidations
 * @param param0
 */
export function idValidations({ id, table, extraMessage }: IdValidations) {
	if (typeof id !== "number") {
		throw new ValidationTypeError(
			`Id number type required. ${table} - ${extraMessage}`
		);
	}
	if (isNaN(id)) {
		throw new ValidationError(
			`Id NaN not allowed as id. ${table} - ${extraMessage}`
		);
	}
	if (id < 0) {
		throw new ValidationError(`Id invalid. ${table} - ${extraMessage}`);
	}
}

/**
 * @deprecated - Deprecated: Use this functions is no longer recommended, instead extend classes using TableValidations
 * @param param0
 */
export function nameValidations({
	name,
	maxNameSize,
	table,
	extraMessage,
}: NameValidations) {
	if (typeof name !== "string") {
		throw new ValidationTypeError(
			`Name String type required ${table} - ${extraMessage}`
		);
	}
	if (name.length === 0) {
		throw new ValidationError(`Username empty ${table} - ${extraMessage}`);
	}
	if (name.length > maxNameSize) {
		throw new ValidationError(
			`Name Username length more than 30 ${table} - ${extraMessage}`
		);
	}
}

interface IdValidations {
	id: number;
	table: Tables;
	extraMessage?: string;
}
interface NameValidations {
	name: string;
	maxNameSize: number;
	table: Tables;
	extraMessage?: string;
}

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
