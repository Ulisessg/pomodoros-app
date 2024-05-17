import Pomodoro from "@/components/molecules/Pomodoro";
import { DefaultTime } from "@/constants";
import { PomodorosCtx } from "@/context/PomodorosCtx";
import { IPomodoro } from "@/models/pomodoro/Pomodoro";
import { AcceptanceCriteria, LoadingSpinner, TrashCan, theme } from "d-system";
import React, { FC, use, useState } from "react";
import styled from "styled-components";

const WorkPomodoroAndRestPomodoro: FC<Props> = (pom) => {
  const { deletePomodorosStatus, deletePomodoros } = use(PomodorosCtx);
  const [pomodoroIsBeingUpdatedOrDeleted, setPomodoroIsBeingUpdatedOrDeleted] =
    useState<boolean>(false);

  const handleDeletePomodoros = async () => {
    setPomodoroIsBeingUpdatedOrDeleted(true);
    await deletePomodoros({
      pomodoroId: pom.id,
      pomodoroIndex: pom.index,
      taskId: pom.task_id,
    });
    await new Promise((resolve) => {
      setTimeout(() => {
        setPomodoroIsBeingUpdatedOrDeleted(false);
        resolve("");
      }, 2000);
    });
  };

  return (
    <>
      {deletePomodorosStatus === "pending" &&
        pomodoroIsBeingUpdatedOrDeleted && <LoadingSpinner size="small" />}
      {!pomodoroIsBeingUpdatedOrDeleted && (
        <>
          <PomodorosContainer>
            <Pomodoro
              id={pom.id}
              duration={pom.duration}
              title={pom.title}
              index={pom.index}
              type="pomodoro"
              projectId={pom.projectId}
              stopped_at={pom.pomodoro_stopped_at}
            />
            {pom.rest_duration !== DefaultTime && (
              <Pomodoro
                id={pom.id}
                duration={pom.rest_duration}
                index={pom.index}
                title="Descanso"
                type="rest"
                projectId={pom.projectId}
                stopped_at={pom.rest_stopped_at}
              />
            )}
            <DeletePomodorosContainer>
              <TrashCan
                width={40}
                height={40}
                title="Eliminar pomodoro"
                onClick={handleDeletePomodoros}
              />
            </DeletePomodorosContainer>
          </PomodorosContainer>
        </>
      )}
      <AcceptanceCriteria
        error={false}
        show={
          deletePomodorosStatus === "fulfilled" &&
          pomodoroIsBeingUpdatedOrDeleted
        }
        text="Pomodoros eliminado"
      />
      <AcceptanceCriteria
        error={true}
        show={
          deletePomodorosStatus === "error" && pomodoroIsBeingUpdatedOrDeleted
        }
        text="Ocurrió un error eliminando los pomodoros, intenta de nuevo más tarde"
      />
    </>
  );
};

const PomodorosContainer = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid ${theme.colors.dark1};
  margin-bottom: ${theme.spacing * 3}px;
  border-radius: ${theme.spacing}px;
`;

const DeletePomodorosContainer = styled.div`
  padding: ${theme.spacing * 2}px;
  align-self: end;
`;

interface Props extends IPomodoro {
  index: number;
  projectId: number;
}

export default WorkPomodoroAndRestPomodoro;
