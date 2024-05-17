import { Modal, ModalCtx, ModalProvider } from "@/context/ModalCtx";
import { TaskCtx } from "@/context/TaskCtx";
import { Button, LoadingSpinner, TrashCan, theme } from "d-system";
import React, { FC, use, useRef } from "react";
import styled from "styled-components";

const DeleteTask: FC<Props> = ({ taskId, taskIndex, projectId, stageId }) => {
  const { deleteTask, deleteTaskStatus } = use(TaskCtx);
  const { openModal, closeModal } = use(ModalCtx);

  const handleDeleteTask = async () => {
    await deleteTask(taskId, taskIndex, projectId, stageId);
    closeModal();
  };

  return (
    <>
      <Modal ariaText="Eliminar tarea">
        <div>
          <WarningStyles>
            Se eliminará la tarea, los pomodoros y las sub tareas asociadas,
            ¿Deseas continuar?
          </WarningStyles>
          <ButtonsContainer>
            <Button
              colorMessage="cancel"
              size="small"
              text="Cancelar"
              onClick={closeModal}
            />
            <Button
              colorMessage="continue"
              size="small"
              text="Eliminar tarea"
              onClick={handleDeleteTask}
            />
          </ButtonsContainer>
          {deleteTaskStatus === "pending" && <LoadingSpinner size="small" />}
        </div>
      </Modal>
      <TrashCanStyles
        height={40}
        width={40}
        title="Eliminar tarea"
        onClick={openModal}
      />
    </>
  );
};

const WarningStyles = styled.p`
  color: ${theme.colors.error};
  font-size: ${theme.spacing * 4}px;
  align-self: center;
`;

const ButtonsContainer = styled.div`
  align-self: end;
  display: flex;
  gap: ${theme.spacing * 3}px;
  justify-content: space-between;
  margin-bottom: ${theme.spacing * 3}px;
`;

const TrashCanStyles = styled(TrashCan)`
  justify-self: end;
  margin: ${theme.spacing * 8}px 0px;
`;

interface Props {
  taskId: number;
  taskIndex: number;
  projectId: number;
  stageId: number;
}

const Wrapper: FC<Props> = (props) => (
  <ModalProvider>
    <DeleteTask {...props} />
  </ModalProvider>
);

export default Wrapper;
