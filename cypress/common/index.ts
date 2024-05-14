export const GoPomodorosHome = () => {
	cy.visit("http://localhost:3002/pomodoros");
};

export const LoginUser = () => {
	cy.get("#supertokens-root")
		.shadow()
		.find("input[type='email']")
		.type(Cypress.env("TEST_AUTH_USER"));

	cy.get("#supertokens-root")
		.shadow()
		.find("input[type='password']")
		.type(Cypress.env("TEST_AUTH_PASSWORD"));

	cy.get("#supertokens-root").shadow().find("button").click();
};

export const HomeSelectProject = (projectLink: string) => {
	cy.get(`a[href*="${projectLink}"]`).click();
};
