import { When, Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { HomeSelectProject, LoginUser } from "../../common";

Given("User visits Pomodoros Home without authentication", () => {
	cy.visit("http://localhost:3002/pomodoros");
});

When("User is in auth page", () => {
	LoginUser();
});

Then("User can access page", () => {
	cy.get("h1").contains("Hello Every Nyan!");
	HomeSelectProject("pomodoros");
});
