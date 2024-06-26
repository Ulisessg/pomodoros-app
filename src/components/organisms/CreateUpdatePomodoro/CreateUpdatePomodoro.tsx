import { PomodorosCtx } from "@/context/PomodorosCtx";
import {
  AcceptanceCriteria,
  Button,
  Form,
  Input,
  LoadingSpinner,
  theme,
  useInputs,
} from "d-system";
import { FC, useContext } from "react";
import styled from "styled-components";

const CreateUpdatePomodoro: FC<CreateUpdatePomodoroProps> = ({ taskId }) => {
  const { createPomodoro, createPomodoroStatus } = useContext(PomodorosCtx);
  const { inputsData, onChange, inputsErrors, restartInputs } = useInputs(
    {
      title: "",
      duration_hrs: "0",
      duration_min: "15",
      duration_sec: "0",
      rest_hrs: "0",
      rest_min: "0",
      rest_sec: "0",
    },
    true
  );
  const allowCreatePomodoro: boolean = (() => {
    const { duration_hrs, duration_min, duration_sec } = inputsData;
    if (duration_hrs === "0" && duration_min === "0" && duration_sec === "0") {
      return false;
    }
    return true;
  })();
  const handleCreateUpdatePomodoro = async () => {
    const formatStringNumber = (n: string): string => {
      const number = Number(n);
      if (Number.isNaN(number)) {
        throw new Error("Invalid number");
      }
      if (number <= 9) return `0${number}`;
      return `${number}`;
    };
    const {
      title,
      duration_hrs,
      duration_min,
      duration_sec,
      rest_hrs,
      rest_min,
      rest_sec,
    } = inputsData;
    const duration = `${formatStringNumber(duration_hrs)}:${formatStringNumber(
      duration_min
    )}:${formatStringNumber(duration_sec)}`;
    const rest_duration = `${formatStringNumber(rest_hrs)}:${formatStringNumber(
      rest_min
    )}:${formatStringNumber(rest_sec)}`;

    createPomodoro({
      duration,
      rest_duration,
      title,
      task_id: taskId,
    });
    restartInputs("all");
  };
  return (
    <Form formTitle="Crear pomodoro" onSubmit={(e) => e.preventDefault()}>
      <Input
        label="Titulo del pomodoro"
        name="title"
        value={inputsData.title}
        inputInvalid={inputsErrors.title}
        maxLength={50}
        minLength={3}
        onChange={onChange}
        acceptanceCriteria="(Opcional)"
      />
      <InputsContainerTitle>Duracion</InputsContainerTitle>
      <InputsContainer>
        <Input
          inputMode="numeric"
          name="duration_hrs"
          label="Horas"
          type="number"
          step={1}
          min={0}
          value={inputsData.duration_hrs}
          onChange={onChange}
        />
        <Input
          inputMode="numeric"
          name="duration_min"
          label="Minutos"
          type="number"
          step={1}
          min={0}
          value={inputsData.duration_min}
          onChange={onChange}
        />
        <Input
          inputMode="numeric"
          name="duration_sec"
          label="Segundos"
          type="number"
          step={1}
          min={0}
          value={inputsData.duration_sec}
          onChange={onChange}
        />
      </InputsContainer>
      <InputsContainerTitle>Descanso</InputsContainerTitle>

      <InputsContainer>
        <Input
          inputMode="numeric"
          name="rest_hrs"
          label="Horas"
          type="number"
          step={1}
          min={0}
          value={inputsData.rest_hrs}
          onChange={onChange}
        />
        <Input
          inputMode="numeric"
          name="rest_min"
          label="Minutos"
          type="number"
          step={1}
          min={0}
          value={inputsData.rest_min}
          onChange={onChange}
        />
        <Input
          inputMode="numeric"
          name="rest_sec"
          label="Segundos"
          type="number"
          step={1}
          min={0}
          value={inputsData.rest_sec}
          onChange={onChange}
        />
      </InputsContainer>
      <Button
        colorMessage="continue"
        size="large"
        text="Crear pomodoro"
        disabled={!allowCreatePomodoro}
        onClick={handleCreateUpdatePomodoro}
      />
      {createPomodoroStatus === "pending" && <LoadingSpinner size="small" />}

      <AcceptanceCriteria
        error={true}
        show={createPomodoroStatus === "error"}
        text="Ocurrió un error creando el pomodoro, intenta de nuevo más tarde"
      />

      <AcceptanceCriteria
        error={false}
        show={createPomodoroStatus === "fulfilled"}
        text="Pomodoro creado."
      />
    </Form>
  );
};

const InputsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing}px;
  margin-bottom: ${theme.spacing * 3}px;
`;

const InputsContainerTitle = styled.p`
  font-weight: bolder;
`;

interface CreateUpdatePomodoroProps {
  taskId: number;
}

export default CreateUpdatePomodoro;
