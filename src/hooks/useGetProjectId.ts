import { usePathname } from "next/navigation";

export default function useGetProjectId(): number {
	const pathname = Number(usePathname().split("/")[2]);
	return pathname;
}
