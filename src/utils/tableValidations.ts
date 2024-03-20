import { Tables } from "@/Types";

export function idValidations({ id, table, extraMessage }: IdValidations) {
	if (typeof id !== "number") {
		throw new TypeError(`Id number type required. ${table} - ${extraMessage}`);
	}
	if (isNaN(id)) {
		throw new Error(`Id NaN not allowed as id. ${table} - ${extraMessage}`);
	}
	if (id < 0) {
		throw new Error(`Id invalid. ${table} - ${extraMessage}`);
	}
}

export function nameValidations({
	name,
	maxNameSize,
	table,
	extraMessage,
}: NameValidations) {
	if (typeof name !== "string") {
		throw new TypeError(`Name String type required ${table} - ${extraMessage}`);
	}
	if (name.length === 0) {
		throw new Error(`Name Username empty ${table} - ${extraMessage}`);
	}
	if (name.length > maxNameSize) {
		throw new Error(
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
