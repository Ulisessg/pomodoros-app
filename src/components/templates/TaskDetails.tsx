import React, { FC, use, useContext, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import TaskDescription from "../molecules/TaskDescription";
import { Button, LoadingSpinner, theme } from "d-system";
import { TaskCtx } from "@/context/TaskCtx";
import getFirstObjectKey from "@/utils/getFirstObjectKey";
import { Modal, ModalCtx } from "@/context/ModalCtx";
import CreateUpdateTask from "../organisms/CreateUpdateTask";

const TaskDetails: FC<TaskDetailsProps> = ({ project, stage, taskId }) => {
  const { openModal } = use(ModalCtx);
  const TaskIndexRef = useRef<number>(0);
  const { tasks: tasksGroupedByStage, getTasks } = useContext(TaskCtx);
  const taskData = useMemo(() => {
    return (
      tasksGroupedByStage[stage]?.find((tsk, taskIndex) => {
        if (tsk.id === taskId) {
          TaskIndexRef.current = taskIndex;
          return true;
        }
        return false;
      }) || null
    );
  }, [stage, taskId, tasksGroupedByStage]);

  useEffect(() => {
    if (typeof getFirstObjectKey(tasksGroupedByStage) === "undefined") {
      getTasks(project);
    }
  }, [getTasks, project, tasksGroupedByStage]);
  return (
    <>
      <Modal ariaText="Editar tarea">
        <CreateUpdateTask
          stageId={stage}
          task={taskData as any}
          taskIndex={TaskIndexRef.current}
        />
      </Modal>
      <Container>
        {taskData === null && <LoadingSpinner size="small" />}
        {taskData !== null && (
          <>
            <TaskName>Tarea: {taskData.name}</TaskName>
            <ButtonEditTask
              colorMessage="continue"
              size="small"
              text="Editar tarea"
              type="button"
              onClick={openModal}
            />
            <TaskDescription
              initialValue={taskData.description}
              controls={false}
              editor={false}
              resetValue={false}
            />
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  width: 100%;
  padding: ${theme.spacing * 3}px;
  gap: ${theme.spacing * 3}px;
  margin: ${theme.spacing * 3}px 0px;
`;

const TaskName = styled.h2`
  font-size: ${theme.spacing * 4}px;
`;

const ButtonEditTask = styled(Button)`
  justify-self: right;
  margin-bottom: ${theme.spacing * 2}px;
`;

interface TaskDetailsProps {
  stage: number;
  project: number;
  taskId: number;
}
export default TaskDetails;
