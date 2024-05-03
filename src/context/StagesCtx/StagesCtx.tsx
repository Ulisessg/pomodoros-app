import { IStage } from "@/models/stage/Stage";
import StageFrontend from "@/models/stage/StageFrontend";
import { FC, ReactNode, createContext, useState } from "react";

const initialState: StagesState = {
	addStages: async () => {},
	stages: {},
	getStages: async () => {},
	getStagesIsLoading: false,
	editWorkflow: async () => {},
	deleteStage: async () => {},
};

export const StagesCtx = createContext(initialState);

export const StagesCtxProvider: FC<StagesCtxProps> = ({ children }) => {
	const [stages, setStages] = useState<TStages>(initialState.stages);
	const [getStagesIsLoading, setGetStagesIsLoading] = useState<boolean>(
		initialState.getStagesIsLoading
	);

	const addStages: StagesState["addStages"] = async (projectId, stages) => {
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
		setGetStagesIsLoading(true);
		const StageFront = new StageFrontend();
		if (!Number.isInteger(projectId)) {
			return;
		}
		StageFront.project_id = projectId;

		const stagesData = await StageFront.getStages();

		addStages(projectId, stagesData);
		setGetStagesIsLoading(false);
	};

	const editWorkflow: StagesState["editWorkflow"] = async (stages) => {
		if (!Array.isArray(stages))
			throw new TypeError("Stages must be array type");
		if (stages.length > 255) throw new RangeError("Stages size not allowed");
		const stageFront = new StageFrontend();
		await stageFront.updateWorkFlow(stages);
	};

	const deleteStage: StagesState["deleteStage"] = async (
		stageId,
		stageIndex,
		projectId
	) => {
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
	};

	return (
		<StagesCtx.Provider
			value={{
				stages,
				addStages,
				getStages,
				editWorkflow,
				deleteStage,
				getStagesIsLoading,
			}}
		>
			{children}
		</StagesCtx.Provider>
	);
};

export interface StagesState {
	stages: TStages;
	getStagesIsLoading: boolean;
	// eslint-disable-next-line no-unused-vars
	addStages: (projectId: number, stages: IStage[]) => Promise<void>;
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
