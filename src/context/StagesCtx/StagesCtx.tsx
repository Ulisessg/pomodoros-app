import useRequest, { Status } from "@/hooks/useRequest";
import { IStage } from "@/models/stage/Stage";
import StageFrontend from "@/models/stage/StageFrontend";
import { FC, ReactNode, createContext, useState } from "react";

const initialState: StagesState = {
  getStagesStatus: "none",
  updateStageStatus: "none",
  deleteStageStatus: "none",
  stages: {},
  addStages: async () => {},
  getStages: async () => {},
  editWorkflow: async () => {},
  deleteStage: async () => {},
};

export const StagesCtx = createContext(initialState);

export const StagesCtxProvider: FC<StagesCtxProps> = ({ children }) => {
  const { status: getStagesStatus, updateStatus: setGetStagesStatus } =
    useRequest();
  const {
    status: updateStageStatus,
    updateStatus: setUpdateStagesStatus,
    restartStatus,
  } = useRequest();
  const {
    status: deleteStageStatus,
    updateStatus: setDeleteStageStatus,
    restartStatus: restartDeleteStageStatus,
  } = useRequest();

  const [stages, setStages] = useState<TStages>(initialState.stages);

  /**
   * Used to add stages after project creation
   * @param projectId
   * @param stages
   */
  const addStages: StagesState["addStages"] = (projectId, stages) => {
    if (!Number.isInteger(projectId)) throw new TypeError("Invalid Project id");
    if (!Array.isArray(stages)) throw new TypeError("Stages must be in array");

    setStages((prevStagesGroupedByProject) => {
      return {
        ...prevStagesGroupedByProject,

        [Number(projectId)]: stages,
      };
    });
  };

  const getStages: StagesState["getStages"] = async (projectId) => {
    try {
      setGetStagesStatus("pending");
      const StageFront = new StageFrontend();
      if (!Number.isInteger(projectId)) {
        return;
      }
      StageFront.project_id = projectId;

      const stagesData = await StageFront.getStages();

      addStages(projectId, stagesData);
      setGetStagesStatus("fulfilled");
    } catch (error) {
      setGetStagesStatus("error");
    }
  };

  const editWorkflow: StagesState["editWorkflow"] = async (stages) => {
    try {
      setUpdateStagesStatus("pending");
      if (!Array.isArray(stages))
        throw new TypeError("Stages must be array type");
      if (stages.length > 255) throw new RangeError("Stages size not allowed");
      const stageFront = new StageFrontend();
      await stageFront.updateWorkFlow(stages);
      setUpdateStagesStatus("fulfilled");
      await restartStatus();
    } catch (error) {
      setUpdateStagesStatus("error");
    }
  };

  const deleteStage: StagesState["deleteStage"] = async (
    stageId,
    stageIndex,
    projectId
  ) => {
    try {
      setDeleteStageStatus("pending");
      const StageFront = new StageFrontend();
      StageFront.id = stageId;
      await StageFront.deleteStage();
      setStages((prev) => {
        const updatedStages = [...prev[Number(projectId)]];
        updatedStages.splice(stageIndex, 1);
        return {
          ...prev,
          [Number(projectId)]: updatedStages,
        };
      });
      setDeleteStageStatus("fulfilled");
      await restartDeleteStageStatus();
    } catch (error) {
      setDeleteStageStatus("error");
    }
  };

  return (
    <StagesCtx.Provider
      value={{
        stages,
        getStagesStatus,
        updateStageStatus,
        deleteStageStatus,
        addStages,
        getStages,
        editWorkflow,
        deleteStage,
      }}
    >
      {children}
    </StagesCtx.Provider>
  );
};

export interface StagesState {
  stages: TStages;
  getStagesStatus: Status;
  updateStageStatus: Status;
  deleteStageStatus: Status;

  // eslint-disable-next-line no-unused-vars
  addStages: (projectId: number, stages: IStage[]) => void;
  // eslint-disable-next-line no-unused-vars
  getStages: (projectId: number) => Promise<void>;

  /**
   * Edit stages order and add new stages to workflow. Stages must be order before call this method
   * @param stages
   * @returns
   */
  editWorkflow: (
    // eslint-disable-next-line no-unused-vars
    stages: IStage[]
  ) => Promise<void>;
  deleteStage: (
    // eslint-disable-next-line no-unused-vars
    stageId: number,
    // eslint-disable-next-line no-unused-vars
    stageIndex: number,
    // eslint-disable-next-line no-unused-vars
    projectId: number
  ) => Promise<void>;
}

export type TStages = Record<
  // Project id
  string,
  IStage[]
>;

interface StagesCtxProps {
  children: ReactNode;
}
