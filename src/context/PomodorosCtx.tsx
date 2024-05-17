"use client";
import { CreatePomodoroBody } from "@/app/api/pomodoros/POST";
import useRequest, { Status } from "@/hooks/useRequest";
import { IPomodoro } from "@/models/pomodoro/Pomodoro";
import PomodoroFrontend from "@/models/pomodoro/PomodoroFrontend";
import getFirstObjectKey from "@/utils/getFirstObjectKey";
import { FC, ReactNode, createContext, useState } from "react";

const initialState: State = {
  getPomodorosStatus: "none",
  createPomodoroStatus: "none",
  updatePomodoroStatus: "none",
  pomodoros: {},
  getPomodoros: async () => {},
  createPomodoro: async () => {},
  updatePomodoro: async () => {},
};

export const PomodorosCtx = createContext(initialState);

export const PomodorosCtxProvider: FC<PomodorosCtxProviderProps> = ({
  children,
}) => {
  const { status: getPomodorosStatus, updateStatus: setGetPomodorosStatus } =
    useRequest();
  const {
    status: createPomodoroStatus,
    updateStatus: updateCreatePomodoroStatus,
    restartStatus: restartCreatePomodorosStatus,
  } = useRequest();
  const {
    status: updatePomodoroStatus,
    updateStatus: setUpdatePomodoroStatus,
    restartStatus: restartUpdatePomodoroStatus,
  } = useRequest();

  const [pomodoros, setPomodoros] = useState<State["pomodoros"]>(
    initialState.pomodoros
  );
  const getPomodoros = async (taskId: number) => {
    try {
      setGetPomodorosStatus("pending");
      if (typeof getFirstObjectKey(pomodoros) === "undefined") {
        const pomodorosFront = new PomodoroFrontend();
        pomodorosFront.task_id = taskId;
        const pomodoros = await pomodorosFront.getPomodoros();
        setPomodoros({
          [Number(taskId)]: pomodoros,
        });
        setGetPomodorosStatus("fulfilled");
      }
    } catch {
      setGetPomodorosStatus("error");
    }
  };

  const createPomodoro: State["createPomodoro"] = async (newPomodoro) => {
    try {
      updateCreatePomodoroStatus("pending");
      const { title, duration, rest_duration, task_id } = newPomodoro;
      const pomodoro = new PomodoroFrontend();

      pomodoro.title = title;
      pomodoro.duration = duration;
      pomodoro.rest_duration = rest_duration;
      pomodoro.task_id = task_id;
      const pomodoroCreated = await pomodoro.addPomodoro();

      setPomodoros((prev) => {
        const firstKey = getFirstObjectKey(prev);
        if (
          typeof firstKey === "undefined" ||
          typeof prev[Number(task_id)] === "undefined"
        ) {
          return {
            [Number(task_id)]: [pomodoroCreated],
          };
        } else {
          const listOfPomodoros = [...prev[Number(task_id)]];
          listOfPomodoros.push(pomodoroCreated);
          return {
            ...prev,
            [Number(task_id)]: [...listOfPomodoros],
          };
        }
      });
      updateCreatePomodoroStatus("fulfilled");
      await restartCreatePomodorosStatus();
    } catch {
      updateCreatePomodoroStatus("error");
    }
  };
  const updatePomodoro: State["updatePomodoro"] = async (
    taskId,
    index,
    updatedPomodoro
  ) => {
    try {
      setUpdatePomodoroStatus("pending");
      if (!Number.isInteger(taskId)) {
        throw new TypeError("Invalid id");
      }
      if (!Number.isInteger(index)) {
        throw new TypeError("Invalid index");
      }
      const uPom = new PomodoroFrontend();
      // Validate pomodoro
      uPom.duration = updatedPomodoro.duration;
      uPom.id = updatedPomodoro.id;
      uPom.pomodoro_stopped_at = updatedPomodoro.pomodoro_stopped_at;
      uPom.rest_duration = updatedPomodoro.rest_duration;
      uPom.rest_stopped_at = updatedPomodoro.rest_stopped_at;
      uPom.task_id = updatedPomodoro.task_id;
      uPom.title = updatedPomodoro.title;
      setPomodoros((prev) => {
        const listOfPomodoros = prev[Number(taskId)];
        listOfPomodoros.splice(index, 1, updatedPomodoro);
        const updatedData: State["pomodoros"] = {
          ...prev,
          [Number(taskId)]: listOfPomodoros,
        };
        return updatedData;
      });
      setUpdatePomodoroStatus("fulfilled");
      await restartUpdatePomodoroStatus();
    } catch (error) {
      setUpdatePomodoroStatus("error");
    }
  };
  return (
    <PomodorosCtx.Provider
      value={{
        getPomodorosStatus,
        createPomodoroStatus,
        updatePomodoroStatus,
        pomodoros,
        getPomodoros,
        createPomodoro,
        updatePomodoro,
      }}
    >
      {children}
    </PomodorosCtx.Provider>
  );
};
interface State {
  getPomodorosStatus: Status;
  createPomodoroStatus: Status;
  updatePomodoroStatus: Status;
  pomodoros: Record<
    // Task id
    number,
    IPomodoro[]
  >;
  // eslint-disable-next-line no-unused-vars
  getPomodoros: (taskId: number) => Promise<void>;
  createPomodoro: (
    // eslint-disable-next-line no-unused-vars
    newPomodoro: Omit<
      CreatePomodoroBody,
      "rest_stopped_at" | "pomodoro_stopped_at"
    >
  ) => Promise<void>;
  /**
   *
   * @param taskId
   * @param index - Index in array of pomodoros
   * @param updatedPomodoro
   * @returns
   */
  updatePomodoro: (
    // eslint-disable-next-line no-unused-vars
    taskId: number,
    // eslint-disable-next-line no-unused-vars
    index: number,
    // eslint-disable-next-line no-unused-vars
    updatedPomodoro: IPomodoro
  ) => Promise<void>;
}
interface PomodorosCtxProviderProps {
  children: ReactNode;
}
