import { PomodorosCtx } from "@/context/PomodorosCtx";
import React, { FC, useContext, useEffect, useMemo } from "react";
import CreateUpdatePomodoro from "../organisms/CreateUpdatePomodoro";

const ListPomodoros: FC<PomodorosProps> = ({ taskId }) => {
	const { getPomodoros, pomodoros: pomodorosGroupedByTask } =
		useContext(PomodorosCtx);

	const pomodoros = useMemo(() => {
		return pomodorosGroupedByTask[Number(taskId)] || [];
	}, [pomodorosGroupedByTask, taskId]);

	useEffect(() => {
		void getPomodoros(taskId);
	}, [getPomodoros, taskId]);

	return (
		<>
			{pomodoros.length === 0 && <p>No pomodoros</p>}
			<CreateUpdatePomodoro taskId={taskId} />
		</>
	);
};

interface PomodorosProps {
	taskId: number;
}

export default ListPomodoros;
