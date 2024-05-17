import {
  BadRequestResponse,
  DeletedResponse,
  ServerErrorResponse,
} from "@/apiConstants";
import {
  ValidationError,
  ValidationTypeError,
} from "@/models/TableValidations";
import TaskBackend from "@/models/task/TaskBackend";
import { NextRequest, NextResponse } from "next/server";

export default async function DELETE(req: NextRequest) {
  try {
    const body: DeleteTaskBody = await req.json();
    const TaskBack = new TaskBackend();
    TaskBack.id = body.taskId;
    await TaskBack.deleteTask();
    return DeletedResponse;
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof ValidationTypeError
    ) {
      return BadRequestResponse(null);
    }

    // Server error
    console.log(error);
    return ServerErrorResponse;
  }
}

export interface DeleteTaskBody {
  taskId: number;
}
