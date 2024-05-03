import LinkProjectSettings from "./LinkProjectSettings";

describe("Link To Project Settings", () => {
	it("Should render correct project settings link", () => {
		cy.mount(<LinkProjectSettings projectId={23} />);
		cy.get('a[href="/pomodoros/project/23/settings"]');
	});
});
