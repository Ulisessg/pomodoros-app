import { redirectToProject } from "@/app/actions";
import { CreateTaskBody } from "@/app/api/tasks/POST";
import { PutTaskRequestBody } from "@/app/api/tasks/PUT";
import { DragEventData } from "@/components/organisms/Task";
import useRequest, { Status } from "@/hooks/useRequest";
import { ITask } from "@/models/task/Task";
import TaskFrontend from "@/models/task/TaskFrontend";
import { FC, ReactNode, createContext, useState } from "react";

const initialState: State = {
  tasks: {},
  addTask: async () => {},
  getTasks: async () => {},
  moveTaskToStage: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
  getTasksStatus: "none",
  updateTaskStageStatus: "none",
  updateTaskStatus: "none",
  createTaskStatus: "none",
  deleteTaskStatus: "none",
};

export const TaskCtx = createContext(initialState);

export const TaskCtxProvider: FC<TaskCtxProps> = ({ children }) => {
  const [tasks, setTasks] = useState<TTask>(initialState.tasks);

  const { status: getTasksStatus, updateStatus: updateGetTasksStatus } =
    useRequest();

  const {
    status: updateTaskStageStatus,
    updateStatus: setUpdateTaskStageStatus,
  } = useRequest();

  const {
    status: updateTaskStatus,
    updateStatus: setUpdateTaskStatus,
    restartStatus: restartUpdateTaskStatus,
  } = useRequest();

  const {
    status: createTaskStatus,
    updateStatus: updateCreateTaskStatus,
    restartStatus: restartCreateTaskStatus,
  } = useRequest();

  const {
    status: deleteTaskStatus,
    updateStatus: setDeleteTaskStatus,
    restartStatus: restartDeleteTaskStatus,
  } = useRequest();

  const addTask: State["addTask"] = async ({ description, name, stage_id }) => {
    updateCreateTaskStatus("pending");
    try {
      const TaskFront = new TaskFrontend();
      TaskFront.name = name;
      TaskFront.description = description;
      TaskFront.stage_id = stage_id;

      const taskCreated = await TaskFront.addTask();

      setTasks((prev) => {
        const stackIdParsed: number = Number(stage_id);
        let prevTasks = prev[stackIdParsed];
        if (!prevTasks) {
          prevTasks = [];
        }
        return {
          ...prev,
          [stackIdParsed]: [...prevTasks, taskCreated],
        };
      });
      updateCreateTaskStatus("fulfilled");
      await restartCreateTaskStatus();
    } catch {
      updateCreateTaskStatus("error");
    }
  };

  const getTasks: State["getTasks"] = async (projectId) => {
    try {
      const TaskFront = new TaskFrontend();
      updateGetTasksStatus("pending");
      const tasksGroupedByStageId = await TaskFront.getTasks(projectId);
      updateGetTasksStatus("fulfilled");

      setTasks(tasksGroupedByStageId);
    } catch {
      updateGetTasksStatus("error");
    }
  };

  const moveTaskToStage: State["moveTaskToStage"] = async (taskData) => {
    setUpdateTaskStageStatus("pending");
    const { newStageId, stageId, taskIndex } = taskData;

    // Avoid duplicate tasks
    if (newStageId === stageId) return;
    const originStageTasks = tasks[Number(stageId)];

    const taskToMove = originStageTasks.at(taskIndex) as ITask;

    try {
      const TaskFront = new TaskFrontend();
      TaskFront.day_id = taskToMove.day_id;
      TaskFront.description = taskToMove.description;
      TaskFront.id = taskToMove.id;
      TaskFront.name = taskToMove.name;
      // Update the stage id
      TaskFront.stage_id = newStageId;

      setTasks((prev) => {
        const tasksWithoutDeletedTask = [...originStageTasks];
        tasksWithoutDeletedTask.splice(taskIndex, 1);

        const targetStageTasks = prev[Number(newStageId)];
        const targetStageTasksUpdated = [...targetStageTasks];
        // Inset the task at the beginning of the stage
        targetStageTasksUpdated.unshift({
          ...taskToMove,
          stage_id: newStageId,
        });

        return {
          ...prev,
          [Number(stageId)]: tasksWithoutDeletedTask,
          [Number(newStageId)]: targetStageTasksUpdated,
        };
      });
      await TaskFront.updateStage();
      setUpdateTaskStageStatus("fulfilled");
    } catch {
      setUpdateTaskStageStatus("error");
    }
  };

  const updateTask: State["updateTask"] = async (stageId, task, taskIndex) => {
    setUpdateTaskStatus("pending");
    try {
      const parsedStageId = Number(stageId);
      const TaskFront = new TaskFrontend(task as ITask);
      const updatedTask = await TaskFront.updateTask();

      if (!Number.isInteger(stageId))
        throw new TypeError("Stage id must be integer");
      setTasks((prev) => {
        const updatedTasks = [...prev[parsedStageId]];
        updatedTasks.splice(taskIndex, 1, updatedTask);
        return {
          ...prev,
          [parsedStageId]: updatedTasks,
        };
      });
      setUpdateTaskStatus("fulfilled");
      await restartUpdateTaskStatus();
    } catch {
      setUpdateTaskStatus("error");
    }
  };

  const deleteTask: State["deleteTask"] = async (
    taskId,
    taskIndex,
    projectId,
    stageId
  ) => {
    try {
      if (!Number.isInteger(taskId))
        throw new TypeError("Task id must be integer");
      if (!Number.isInteger(taskIndex))
        throw new TypeError("Task index must be integer");
      setDeleteTaskStatus("pending");

      const TaskFront = new TaskFrontend();
      TaskFront.id = taskId;
      await TaskFront.deleteTask();

      setTasks((prev) => {
        const updatedTasks = [...prev[Number(stageId)]];
        updatedTasks.splice(taskIndex, 1);
        return {
          ...prev,
          [Number(stageId)]: updatedTasks,
        };
      });
      setDeleteTaskStatus("fulfilled");
      await redirectToProject(projectId);
    } catch (error) {
      setDeleteTaskStatus("error");
    } finally {
      await restartDeleteTaskStatus();
    }
  };

  return (
    <TaskCtx.Provider
      value={{
        getTasksStatus,
        tasks,
        updateTaskStageStatus,
        updateTaskStatus,
        createTaskStatus,
        deleteTaskStatus,
        addTask,
        getTasks,
        moveTaskToStage,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskCtx.Provider>
  );
};

interface State {
  getTasksStatus: Status;
  updateTaskStageStatus: Status;
  updateTaskStatus: Status;
  createTaskStatus: Status;
  deleteTaskStatus: Status;
  tasks: TTask;
  // eslint-disable-next-line no-unused-vars
  addTask: (task: CreateTaskBody) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  getTasks: (projectId: number) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  moveTaskToStage: (data: UpdateTaskArg) => Promise<void>;

  updateTask: (
    // eslint-disable-next-line no-unused-vars
    stageId: number,
    // eslint-disable-next-line no-unused-vars
    task: PutTaskRequestBody,
    // eslint-disable-next-line no-unused-vars
    taskIndex: number
  ) => Promise<void>;
  deleteTask: (
    // eslint-disable-next-line no-unused-vars
    taskId: number,
    // eslint-disable-next-line no-unused-vars
    taskIndex: number,
    // eslint-disable-next-line no-unused-vars
    projectId: number,
    // eslint-disable-next-line no-unused-vars
    stageId: number
  ) => Promise<void>;
}

interface TaskCtxProps {
  children: ReactNode;
}

export type TTask = Record<
  // Stage id
  string,
  ITask[]
>;

interface UpdateTaskArg extends DragEventData {
  newStageId: number;
}
