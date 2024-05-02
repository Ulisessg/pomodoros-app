import { When, Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("User visits Pomodoros Home without authentication", () => {
	cy.visit("http://localhost:3002/pomodoros");
});

When("User is in auth page", () => {
	cy.get("#supertokens-root")
		.shadow()
		.find("input[type='email']")
		.type(Cypress.env("TEST_AUTH_USER"));

	cy.get("#supertokens-root")
		.shadow()
		.find("input[type='password']")
		.type(Cypress.env("TEST_AUTH_PASSWORD"));

	cy.get("#supertokens-root").shadow().find("button").click();
});

Then("User can access page", () => {
	cy.get("h1").contains("Hello Every Nyan!");
	cy.get('a[data-project-name="Pomodoros App"]').click();
});
