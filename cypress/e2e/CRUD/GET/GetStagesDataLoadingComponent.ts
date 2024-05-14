import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { GoPomodorosHome, HomeSelectProject, LoginUser } from "../../../common";

When('user requests project stages', () => {
    GoPomodorosHome()
    LoginUser()
    HomeSelectProject('pomodoros')
    cy.get('a[href*="project"]').last().click()
})
Then('Show a loading component while request ends', () => {
    cy.get('div[data-stages-loading-spinner]')
})