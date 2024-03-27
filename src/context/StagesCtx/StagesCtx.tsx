import { IStage } from "@/models/stage/Stage";
import StageFrontend from "@/models/stage/StageFrontend";
import { FC, ReactNode, createContext, useState } from "react";

const initialState: StagesState = {
	addStages: () => {},
	stages: {},
	getStages: async () => {},
};

export const StagesCtx = createContext(initialState);

export const StagesCtxProvider: FC<StagesCtxProps> = ({ children }) => {
	const [stages, setStages] = useState<TStages>(initialState.stages);

	const addStages: StagesState["addStages"] = (projectId, stages) => {
		setStages((prev) => ({
			...prev,
			[Number(projectId)]: stages,
		}));
	};

	const getStages: StagesState["getStages"] = async (projectId) => {
		const StageFront = new StageFrontend();
		if (!Number.isInteger(projectId)) {
			return;
		}
		StageFront.project_id = projectId;

		const stagesData = await StageFront.getStages();
		addStages(projectId, stagesData);
	};

	return (
		<StagesCtx.Provider
			value={{
				stages,
				addStages,
				getStages,
			}}
		>
			{children}
		</StagesCtx.Provider>
	);
};

export interface StagesState {
	stages: TStages;
	// eslint-disable-next-line no-unused-vars
	addStages: (projectId: number, stages: IStage[]) => void;
	// eslint-disable-next-line no-unused-vars
	getStages: (projectId: number) => Promise<void>;
}

export type TStages = Record<
	// Project id
	string,
	IStage[]
>;

interface StagesCtxProps {
	children: ReactNode;
}
