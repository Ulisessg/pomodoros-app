/**
 * Used to validate if object is empty, util when you want to check if context state is empty
 * @param obj
 * @returns
 */
export default function getFirstObjectKey(
	obj: Record<any, any>
): string | undefined {
	if ((obj as Object).toString() !== "[object Object]")
		throw new TypeError("obj param is not object");
	let fKey = undefined;
	for (const key in obj) {
		fKey = key;
		break;
	}
	return fKey;
}
