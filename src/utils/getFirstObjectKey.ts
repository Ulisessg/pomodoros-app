export default function getFirstObjectKey(
	obj: Record<any, any>
): string | undefined {
	let fKey = undefined;
	for (const key in obj) {
		fKey = key;
		break;
	}
	return fKey;
}
