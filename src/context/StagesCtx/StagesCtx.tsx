import { IStage } from "@/models/stage/Stage"
import { FC, ReactNode, createContext, useState } from "react"

const initialState: StagesState = {
  addStages: () => {},
  stages: {}
}

export const StagesCtx = createContext(initialState)

export const StagesCtxProvider: FC<StagesCtxProps> = ({children}) => {
  const [stages, setStages] = useState<TStages>(initialState.stages)

  const addStages: StagesState['addStages'] = (projectId, stages) => {
    setStages((prev) => ({
      ...prev,
      [Number(projectId)]: stages
    }))
  }

  return <StagesCtx.Provider value={{
    stages,
    addStages
  }}>
    {children}
  </StagesCtx.Provider>
}

export interface StagesState {
  stages: TStages
  // eslint-disable-next-line no-unused-vars
  addStages: (projectId: number, stages: IStage[]) => void
}


type TStages = Record<
  // Project id
  string,
  IStage[]
>

interface StagesCtxProps {
  children: ReactNode
}