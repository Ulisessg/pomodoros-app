import { GetTaskResponse } from "@/app/api/tasks/GET";
import CreateUpdateTask from "./CreateUpdateTask";
import { TaskCtx, TaskCtxProvider } from "@/context/TaskCtx";
import { ITask } from "@/models/task/Task";
import { GlobalStyles, LoadingSpinner } from "d-system";
import { FC, useContext, useEffect } from "react";

const ComponentCreateTask: FC = () => {
	return (
		<GlobalStyles footer={false}>
			<TaskCtxProvider>
				<CreateUpdateTask stageId={2} />
			</TaskCtxProvider>
		</GlobalStyles>
	);
};

const Component: FC = () => {
	const { getTasks, getTasksIsLoading } = useContext(TaskCtx);

	useEffect(() => {
		void getTasks(22);
	}, []);
	return (
		<>
			{getTasksIsLoading ? (
				<LoadingSpinner size="small" />
			) : (
				<CreateUpdateTask
					stageId={2}
					task={{
						name: "Buy required har",
						description: `## Requisites
- Requisite 1
- Requisite 2
- Requisite 3`,
						day_id: 1,
						id: 1,
						stage_id: 2,
					}}
					taskIndex={0}
				/>
			)}
		</>
	);
};

const ComponentUpdateTask: FC = () => {
	return (
		<GlobalStyles footer={false}>
			<TaskCtxProvider>
				<Component />
			</TaskCtxProvider>
		</GlobalStyles>
	);
};

const getTasks = () => {
	const res: GetTaskResponse = {
		error: false,
		tasks: {
			2: [
				{
					name: "Buy required har",
					description: `## Requisites
- Requisite 1
- Requisite 2
- Requisite 3`,
					day_id: 1,
					id: 1,
					stage_id: 2,
					start_date: "",
				},
			],
		},
	};
	return cy.intercept(
		"get",
		"http://localhost:8080/pomodoros/api/tasks?projectId=22",
		{
			body: res,
		}
	);
};

describe("Form to create or update tasks", () => {
	beforeEach(() => {
		cy.viewport("macbook-11");
	});
	it("Should render", () => {
		getTasks();
		cy.mount(<ComponentCreateTask />);
		const form = cy.get("form");
		form.get("p").contains("Nueva tarea");
		form.get('input[name="task_name"]');
		form.get('textarea[name="description"]');
		form.get("button[disabled]");
	});

	it("Should create task", () => {
		getTasks();
		cy.mount(<ComponentCreateTask />);
		cy.intercept("post", "http://localhost:8080/pomodoros/api/tasks", {
			body: {
				day_id: 1,
				description: "",
				id: 2,
				name: "Implement V2 of database",
				stage_id: 2,
				start_date: "",
			} as ITask,
		});

		cy.get("input").type("Implement V2 of database");
		cy.get("textarea").type(`
# Todo
Lorem ipsum dolor sit amet, consectetur adipisicing elit. 

## Validations
- Quibusdam sunt qui
- Excepturi assumenda
`);
		cy.get("button").click();
	});

	it("Should properly render update task", () => {
		getTasks();
		cy.mount(<ComponentUpdateTask />);
		cy.get("textarea").contains("## Requisites");
		cy.get('input[value="Buy required har"]').type("dware");
		cy.get("button").contains("Actualizar tarea");
		cy.get("button").should("be.enabled");
	});

	it("Should update task", () => {
		getTasks();
		cy.intercept("patch", "http://localhost:8080/pomodoros/api/tasks", {
			statusCode: 200,
			body: {
				name: "Buy required hardware",
				description: `## Requisites
- Requisite 1
- Requisite 2
- Requisite 3`,
				day_id: 1,
				id: 1,
				stage_id: 2,
				start_date: "",
			} as ITask,
		});
		cy.mount(<ComponentUpdateTask />);
		cy.get("input").type("dware");
		cy.get("button").click({});
	});
});
