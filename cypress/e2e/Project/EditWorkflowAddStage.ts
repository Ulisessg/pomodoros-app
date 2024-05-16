import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { GoPomodorosHome, HomeSelectProject, LoginUser } from "../../common";

When("User add new stage", () => {
  GoPomodorosHome();
  LoginUser();
  HomeSelectProject("pomodoros");
  // Select project and go to edit stages
  cy.get("div[data-list-of-projects]").find("a").first().click();
  cy.get("a[data-project-setting-link]").click();
  cy.contains("Editar flujo de trabajo").click();

  // Add stage
  cy.contains("Añadir Stage").click();

  // Edit stage name
  const stageToRename = cy.get('input[value^="Nuevo"]').first();
  stageToRename.clear();
  stageToRename.type("Renamed stage");

  // Save changes
  cy.contains("Guardar cambios").click();
});

Then("Changes are stored into database", () => {
  cy.reload();
  cy.wait(2000);
  cy.get('input[value^="Renamed stage"]');
});
