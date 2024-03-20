import { Tables } from "@/Types";

export function idValidations({ id, table }: IdValidations) {
	if (typeof id !== "number") {
		throw new TypeError(`Id number type required. ${table}`);
	}
	if (isNaN(id)) {
		throw new Error(`Id NaN not allowed as id. ${table}`);
	}
	if (id < 0) {
		throw new Error(`Id invalid. ${table}`);
	}
}

export function nameValidations({ name, maxNameSize, table }: NameValidations) {
	if (typeof name !== "string") {
		throw new TypeError(`Name String type required ${table}`);
	}
	if (name.length === 0) {
		throw new Error(`Name Username empty ${table}`);
	}
	if (name.length > maxNameSize) {
		throw new Error(`Name Username length more than 30 ${table}`);
	}
}

interface IdValidations {
	id: number;
	table: Tables;
}
interface NameValidations {
	name: string;
	maxNameSize: number;
	table: Tables;
}
