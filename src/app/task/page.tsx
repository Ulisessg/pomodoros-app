"use client";
import useGetTaskDataFromUrl from "@/hooks/useGetTaskDataFromUrl";
import TaskDetails from "@/components/templates/TaskDetails";
import ListPomodoros from "@/components/templates/ListPomodoros";
import { FC, Suspense } from "react";
import { LoadingSpinner } from "d-system";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { ModalProvider } from "@/context/ModalCtx";
import DeleteTask from "@/components/molecules/DeleteTask";

const TaskDetailPage = () => {
  const { stageId, taskId, projectId, taskIndex } = useGetTaskDataFromUrl();

  return (
    <SessionAuth>
      <ModalProvider>
        <TaskDetails
          project={projectId}
          stage={stageId}
          taskIndex={taskIndex}
        />
      </ModalProvider>
      <ListPomodoros taskId={taskId} />
      <DeleteTask
        taskId={taskId}
        taskIndex={taskIndex}
        projectId={projectId}
        stageId={stageId}
      />
    </SessionAuth>
  );
};

const Wrapper: FC = () => (
  <Suspense fallback={<LoadingSpinner size="small" />}>
    <TaskDetailPage />
  </Suspense>
);

export default Wrapper;
