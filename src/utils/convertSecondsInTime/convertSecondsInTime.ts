/**
 *
 * @param seconds Format: 00:00:00
 */
export default function convertSecondsInTime(seconds: number): string {
	if (typeof seconds !== "number")
		throw new TypeError("Seconds must be number");
	if (!Number.isInteger(seconds)) {
		throw new RangeError("Seconds is not integer");
	}
	const timeFromEpoch = new Date(0 + seconds * 1000)
		.toUTCString()
		.split(" ")[4];
	return timeFromEpoch;
}
