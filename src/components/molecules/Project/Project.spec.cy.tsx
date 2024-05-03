import { IProject } from "@/models/project/Project";
import Project from "./Project";

describe("Project component - Molecules", () => {
	const commonProject: IProject = {
		description:
			"An very interesting description, you can't imagine how much important is.",
		id: 0,
		name: "Tesis",
		user_id: "1-2-3-4-5",
	};
	it("Should properly render with full data", () => {
		cy.mount(<Project project={commonProject} />);
		cy.get('a[href="/pomodoros/project/0"]');
		cy.get("p").contains("Tesis:");
		cy.get("p").contains("An very interesting descrip...");
	});
	it("Should render properly without description", () => {
		cy.mount(<Project project={{ ...commonProject, description: "" }} />);
		cy.get("p").contains("Tesis");
	});
	it("Should show full description when length is less than 27", () => {
		cy.mount(
			<Project project={{ ...commonProject, description: "Less than 27" }} />
		);
		cy.get("p").contains("Less than 27");
	});
});
