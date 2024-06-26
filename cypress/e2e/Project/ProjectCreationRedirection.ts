import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { GoPomodorosHome, HomeSelectProject, LoginUser } from "../../common";

When("User succesfully creates a project", () => {
  GoPomodorosHome();
  LoginUser();
  HomeSelectProject("pomodoros");
  cy.get("button[data-open-create-project-button]").click();

  const formCreateProject = cy.get("form");
  // Use time to avoid repeat same project name
  formCreateProject
    .get('input[name="projectName"]')
    .type(`Tesis-${new Date().getTime()}`);
  formCreateProject
    .get('input[name="projectDescription"]')
    .type("A very important and interesting tesis");
  cy.get("button[data-button-create-project]").click();
});

Then("User is redirected to edit project workflow", () => {
  cy.url().should(
    "match",
    /http:\/\/localhost:3002\/pomodoros\/project\/(\d+)\/settings\/edit-stages/g
  );
});
