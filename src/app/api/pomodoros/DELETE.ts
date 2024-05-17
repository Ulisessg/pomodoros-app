import {
  BadRequestResponse,
  DeletedResponse,
  ServerErrorResponse,
} from "@/apiConstants";
import {
  ValidationError,
  ValidationTypeError,
} from "@/models/TableValidations";
import PomodoroBackend from "@/models/pomodoro/PomodoroBackend";
import { NextRequest } from "next/server";

export default async function DELETE(req: NextRequest) {
  try {
    const body: DeletePomdoroBody = await req.json();
    const pomdoro = new PomodoroBackend();
    pomdoro.id = body.pomodoroId;
    await pomdoro.deletePomodoro();
    return DeletedResponse;
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof ValidationTypeError
    ) {
      return BadRequestResponse(null);
    }

    // eslint-disable-next-line no-console
    console.log(error);
    return ServerErrorResponse;
  }
}

export interface DeletePomdoroBody {
  pomodoroId: number;
}
