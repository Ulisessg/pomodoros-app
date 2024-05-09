"use client";
import useGetTaskDataFromUrl from "@/hooks/useGetTaskDataFromUrl";
import TaskDetails from "@/components/templates/TaskDetails";
import ListPomodoros from "@/components/templates/ListPomodoros";
import { FC, Suspense } from "react";
import { LoadingSpinner } from "d-system";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { ModalProvider } from "@/context/ModalCtx";

const TaskDetailPage = () => {
  const { stage, task, project } = useGetTaskDataFromUrl();

  return (
    <SessionAuth>
      <ModalProvider>
        <TaskDetails project={project} stage={stage} taskId={task} />
      </ModalProvider>
      <ListPomodoros taskId={task} />
    </SessionAuth>
  );
};

const Wrapper: FC = () => (
  <Suspense fallback={<LoadingSpinner size="small" />}>
    <TaskDetailPage />
  </Suspense>
);

export default Wrapper;
