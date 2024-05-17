import { Then, When} from '@badeball/cypress-cucumber-preprocessor'
import { GoPomodorosHome, HomeSelectProject, LoginUser } from '../../../common'

When('User request projects data', () => {
    GoPomodorosHome()
    LoginUser()
    HomeSelectProject('pomodoros')
})

Then('Show a loading comonent while request ends', () => {
    cy.get('div[data-loading-spinner]')
    // Re check data is showed
    cy.get('a[href*="project"]')
})