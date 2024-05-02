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

export const HomeSelectProject = (projectName: string) => {
	cy.get(`a[data-project-name="${projectName}"]`).click();
};
