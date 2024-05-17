import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { GoPomodorosHome, HomeSelectProject, LoginUser } from "../../../common";

When('User enter visit project page', ()=> {
    GoPomodorosHome()
    LoginUser()
    HomeSelectProject('pomodoros')
    cy.get('a[href*="project"]').last().click()
})
Then('Show a loading component while tasks are loading', () => {
    cy.get('div[data-tasks-loading-spinner]')
})