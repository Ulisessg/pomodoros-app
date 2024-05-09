import { TaskCtx } from "@/context/TaskCtx";
import { AcceptanceCriteria, Button, LoadingSpinner, theme } from "d-system";
import { DragEvent, FC, Fragment, useContext, useMemo } from "react";
import styled, { css } from "styled-components";
import Task, { DragEventData } from "@/components/organisms/Task";
import { ITask } from "@/models/task/Task";
import { MinScreenWidth } from "@/constants";
import { ModalCtx } from "../../context/ModalCtx";

const Stage: FC<StageProps> = ({ title, stageId, projectId }) => {
  const { openModal } = useContext(ModalCtx);
  const {
    tasks: tasksGroupedByStage,
    moveTaskToStage,
    getTasksStatus,
    updateTaskStageStatus,
  } = useContext(TaskCtx);
  const tasks: ITask[] = useMemo(() => {
    return tasksGroupedByStage[stageId];
  }, [stageId, tasksGroupedByStage]);
  const stageHaveTasks: boolean = useMemo(() => {
    if (!Array.isArray(tasks)) return false;

    if (tasks.length > 0) return true;
    return false;
  }, [tasks]);

  const handleOnDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskOrigin: DragEventData = JSON.parse(
      e.dataTransfer.getData("text/plain")
    );

    await moveTaskToStage({
      newStageId: stageId,
      stageId: taskOrigin.stageId,
      taskIndex: taskOrigin.taskIndex,
    });
  };
  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const handleOpenModal = () => {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      `?stageId=${stageId}`;
    window.history.pushState({ path: newurl }, "", newurl);
    openModal();
  };

  return (
    <div>
      <StageContainer onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
        <StageTitle>{title}</StageTitle>
        <TasksContainer>
          {stageHaveTasks &&
            getTasksStatus !== "pending" &&
            tasks.map((task, index) => {
              return (
                <Fragment key={`${stageId}${task.id}`}>
                  <Task
                    task={task}
                    taskIndex={index}
                    projectId={projectId}
                    isExampleTask={false}
                  />
                </Fragment>
              );
            })}
          {getTasksStatus === "pending" && (
            <StageEmptyMessageContainer>
              <LoadingSpinner size="small" />
            </StageEmptyMessageContainer>
          )}

          {!stageHaveTasks && getTasksStatus !== "pending" && (
            <StageEmptyMessageContainer>
              <StageEmptyMessage>No Tasks yet</StageEmptyMessage>
            </StageEmptyMessageContainer>
          )}
        </TasksContainer>
      </StageContainer>
      <AddTaskButton
        colorMessage="continue"
        size="100%"
        text="Añadir tarea"
        onClick={handleOpenModal}
      />
      <AcceptanceCriteria
        error={true}
        show={updateTaskStageStatus === "error"}
        text="Error actualizando tarea, intenta de nuevo más tarde"
      />
    </div>
  );
};

const StageHeight = theme.spacing * 45;
const StageTitleHeight = theme.spacing * 2;
const StageTitlePadding = StageTitleHeight;

export const StageContainerStyles = css`
  overflow: scroll;
  border: 1px solid ${theme.colors.dark1};
  border-radius: ${theme.spacing}px;
  width: ${theme.spacing * 35}px;
  height: ${StageHeight}px;
`;

export const StageContainer = styled.div`
  ${StageContainerStyles}
`;

export const StageTitleStyles = css`
  text-align: center;
  padding: ${StageTitlePadding}px;
  height: ${StageTitleHeight}px;
`;

export const StageTitle = styled.p`
  ${StageTitleStyles}
`;

export const TasksContainer = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: ${theme.spacing}px;
`;

const StageEmptyMessageContainer = styled.div`
  display: grid;
  /**
	* Padding includes top and bottom
	* Second StageTitleHeight is StageEmptyMessage height
	*/
  height: ${StageHeight -
  StageTitleHeight -
  StageTitleHeight -
  StageTitlePadding * 2}px;
  margin: 0px;
  align-content: center;
  justify-content: center;
`;
const StageEmptyMessage = styled.p`
  text-align: center;

  height: ${StageTitleHeight}px;
`;

const AddTaskButton = styled(Button)``;

// CONTAINERS

const StagesGap = theme.spacing * 2;

export const StagesContainer = styled.div`
  display: grid;
  gap: ${StagesGap}px;
  grid-template-columns: 1fr;
  @media screen and (min-width: ${MinScreenWidth.tablet}px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${MinScreenWidth.desktop}px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ListOfStagesContainer = styled.div`
  display: grid;
  margin-bottom: ${theme.spacing * 6}px;
  width: 100%;
  justify-content: center;
`;

export interface StageProps {
  title: string;
  color: string;
  stageId: number;
  projectId: number;
}
export default Stage;
