"use client";
import React, {
  DragEvent,
  Fragment,
  use,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ListOfStagesContainer,
  StagesContainer,
} from "@/components/organisms/Stage";
import StageExample, {
  StageExampleDragEventData,
} from "@/components/organisms/StageExample";
import { StagesCtx } from "@/context/StagesCtx";
import useGetProjectId from "@/hooks/useGetProjectId";
import { IStage } from "@/models/stage/Stage";
import { AcceptanceCriteria, Button, LoadingSpinner } from "d-system";
import { TaskCtx } from "@/context/TaskCtx";
import getFirstObjectKey from "@/utils/getFirstObjectKey";

const EditListOfStages = () => {
  const initialStages = useRef<IStage[]>([]);
  const {
    stages: StagesGroupedByProject,
    getStages,
    getStagesStatus,
    editWorkflow,
    updateStageStatus,
    deleteStageStatus,
  } = useContext(StagesCtx);
  const { getTasks, tasks } = use(TaskCtx);
  const projectId = useGetProjectId();

  const stages = useMemo(() => {
    return StagesGroupedByProject[Number(projectId)];
  }, [StagesGroupedByProject, projectId]);

  // In case user cancels update don't affect original stages
  const [stagesLocal, setStagesLocal] = useState<IStage[]>([]);

  const handleOnDragEnd = (ev: DragEvent<HTMLDivElement>) => {
    (ev.target as HTMLDivElement).style.opacity = "1";
  };

  const handleOnDrop = (e: DragEvent) => {
    e.stopPropagation();
    const { stageIndex: stageIndexOrigin }: StageExampleDragEventData =
      JSON.parse(e.dataTransfer.getData("text/plain"));

    const stageIndexDestiny = Number(
      e.currentTarget.getAttribute("data-stage-index")
    );
    setStagesLocal((prev) => {
      const updatedStages = [...prev];
      const stageToMove = updatedStages[Number(stageIndexOrigin)];
      const stageToBeReplaced = updatedStages[Number(stageIndexDestiny)];
      stageToMove.stage_order = stageIndexDestiny;
      stageToBeReplaced.stage_order = stageIndexOrigin;

      updatedStages.splice(stageIndexDestiny, 1, stageToMove);
      updatedStages.splice(stageIndexOrigin, 1, stageToBeReplaced);
      return updatedStages;
    });
  };

  const updateStageName = (index: number, newName: string) => {
    setStagesLocal((prev) => {
      const stgs = [...prev];
      stgs[Number(index)].name = newName;
      return stgs;
    });
  };

  const addNewStage = () => {
    setStagesLocal((prev) => {
      const stagesQty = prev.length;
      if (stagesQty > 255) {
        return prev;
      }
      const newStage: IStage = {
        color: "ecf7fe",
        name: `Nuevo stage - ${stagesQty + 1}`,
        project_id: projectId,
        stage_order: stagesQty - 1,
        id: null as unknown as number,
      };
      return [...prev, newStage];
    });
  };

  const removeLocalStage = (stageIndex: number) => {
    if (!Number.isInteger(stageIndex)) {
      throw new TypeError("Invalid stage index");
    }
    setStagesLocal((prev) => {
      const updatedLocalStages = [...prev];
      updatedLocalStages.splice(stageIndex, 1);
      return updatedLocalStages;
    });
  };

  const saveWorkflowChanges = async () => {
    await editWorkflow(stagesLocal);
  };

  useEffect(() => {
    if (!Array.isArray(stages)) {
      getStages(projectId);
    } else {
      setStagesLocal(stages);
    }
  }, [projectId, StagesGroupedByProject, stages]);

  useEffect(() => {
    // Ensure user request tasks
    if (typeof getFirstObjectKey(tasks) === "undefined") {
      void getTasks(projectId);
    }
  }, [projectId, tasks]);

  useEffect(() => {
    if (typeof stages !== "undefined") {
      initialStages.current = stages;
    }
  }, [getStagesStatus, stages]);

  return (
    <>
      {getStagesStatus === "pending" && <LoadingSpinner size="large" />}
      {updateStageStatus === "pending" && <LoadingSpinner size="small" />}
      {deleteStageStatus === "pending" && <LoadingSpinner size="small" />}

      <AcceptanceCriteria
        error={false}
        show={updateStageStatus === "fulfilled"}
        text="Flujo de trabajo actualizado"
      />
      <AcceptanceCriteria
        error={true}
        show={updateStageStatus === "error"}
        text="Ocurrio un error actualizando el flujo de trabajo, intenta de nuevo mas tarde"
      />
      <AcceptanceCriteria
        error={true}
        show={deleteStageStatus === "error"}
        text="Ocurrio un error actualizando el flujo de trabajo, intenta de nuevo mas tarde"
      />
      <AcceptanceCriteria
        error={false}
        show={deleteStageStatus === "fulfilled"}
        text="Stage eliminado"
      />

      <div>
        {typeof stages !== "undefined" && (
          <div>
            <Button
              colorMessage="info"
              size="small"
              text="Añadir Stage"
              type="button"
              onClick={addNewStage}
              disabled={stagesLocal.length >= 255}
            />
            <Button
              colorMessage="continue"
              size="small"
              text="Guardar cambios"
              type="button"
              onClick={saveWorkflowChanges}
            />
          </div>
        )}
        <ListOfStagesContainer>
          {/** Config link replaced with hidden <p /> */}
          <p aria-hidden="true"></p>
          <StagesContainer onDragEnd={handleOnDragEnd}>
            {typeof stages !== "undefined" &&
              stagesLocal.map((stage, index) => (
                <Fragment key={`${stage.id}-${stage.name}`}>
                  <div draggable>
                    <StageExample
                      color={stage.color}
                      projectId={projectId}
                      stageId={stage.id}
                      title={stage.name}
                      stageIndex={index}
                      handleOnDrop={handleOnDrop}
                      updateStageName={updateStageName}
                      removeLocalStage={removeLocalStage}
                    />
                  </div>
                </Fragment>
              ))}
          </StagesContainer>
        </ListOfStagesContainer>
      </div>
    </>
  );
};

export default EditListOfStages;
