import { ProjectsCtx } from "@/context/ProjectsCtx";
import useGetProjectId from "@/hooks/useGetProjectId";
import { useContext, useMemo } from "react";

export default function useProject(): UseProjectReturn {
	const { projects } = useContext(ProjectsCtx);
	const projectId = useGetProjectId();
	const projectName: string = useMemo(() => {
		return projects.find((proj) => proj.id === projectId)?.name || "";
	}, [projectId, projects]);
	return {
		projectId,
		projectName,
	};
}

interface UseProjectReturn {
	projectId: number;
	projectName: string;
}
