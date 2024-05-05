import CreateUpdateTask from "./CreateUpdateTask";
import { TaskCtxProvider } from "@/context/TaskCtx";
import { ITask } from "@/models/task/Task";
import { GlobalStyles } from "d-system";
import { FC } from "react";

const Component: FC = () => {
	return (
		<GlobalStyles footer={false}>
			<TaskCtxProvider>
				<CreateUpdateTask stageId={2} />
			</TaskCtxProvider>
		</GlobalStyles>
	);
};

describe("Form to create or update tasks", () => {
	beforeEach(() => {
		cy.viewport("macbook-11");
	});
	it("Should render", () => {
		cy.mount(<Component />);
		const form = cy.get("form");
		form.get("p").contains("Nueva tarea");
		form.get('input[name="task_name"]');
		form.get('textarea[name="description"]');
		form.get("button[disabled]");
	});

	it("Should create task", () => {
		cy.mount(<Component />);
		cy.intercept("http://localhost:8080/pomodoros/api/tasks", {
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
});
