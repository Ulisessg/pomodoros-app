"use client";
import { useSearchParams, usePathname } from "next/navigation";

export default function useGetProjectId(): number {
	const pathName = usePathname();
	const searchParams = useSearchParams();

	if (pathName.includes("/project")) {
		return Number(pathName.split("/")[2]);
	}

	const projectId = Number(searchParams.get("project"));
	return projectId;
}
