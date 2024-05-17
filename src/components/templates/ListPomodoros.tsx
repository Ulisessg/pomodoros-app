"use client";
import { PomodorosCtx } from "@/context/PomodorosCtx";
import React, { FC, Fragment, useContext, useEffect, useMemo } from "react";
import CreateUpdatePomodoro from "../organisms/CreateUpdatePomodoro";
import { PomodorosContainerProvider } from "@/context/PomodorosContainerCtx";
import useGetProjectId from "@/hooks/useGetProjectId";
import WorkPomodoroAndRestPomodoro from "../organisms/WorkPomodoroAndRestPomodoro";
import { LoadingSpinner } from "d-system";

const ListPomodoros: FC<PomodorosProps> = ({ taskId }) => {
  const projectId = useGetProjectId();
  const {
    getPomodoros,
    pomodoros: pomodorosGroupedByTask,
    getPomodorosStatus,
  } = useContext(PomodorosCtx);

  const pomodoros = useMemo(() => {
    return pomodorosGroupedByTask[Number(taskId)] || [];
  }, [pomodorosGroupedByTask, taskId]);

  useEffect(() => {
    void getPomodoros(taskId);
  }, [getPomodoros, taskId]);

  return (
    <PomodorosContainerProvider>
      {getPomodorosStatus === "pending" && <LoadingSpinner size="small" />}
      {getPomodorosStatus === "fulfilled" && pomodoros.length === 0 && (
        <p>No pomodoros</p>
      )}
      {getPomodorosStatus === "fulfilled" &&
        pomodoros.length > 0 &&
        pomodoros.map((pom, index) => (
          <Fragment key={`${pom.id}${pom.task_id}`}>
            <WorkPomodoroAndRestPomodoro
              {...pom}
              index={index}
              projectId={projectId}
            />
          </Fragment>
        ))}
      <CreateUpdatePomodoro taskId={taskId} />
    </PomodorosContainerProvider>
  );
};

interface PomodorosProps {
  taskId: number;
}

export default ListPomodoros;
