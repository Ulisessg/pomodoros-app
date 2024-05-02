import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("User visits Pomodoros Home", () => {
	cy.visit("http://localhost:3002/pomodoros", { failOnStatusCode: false });
});

When("User is unauthenticated", () => {});

Then("Is redirected to auth service", () => {
	cy.url().should("eq", "http://localhost:3000/auth/?redirectToPath=");
});
