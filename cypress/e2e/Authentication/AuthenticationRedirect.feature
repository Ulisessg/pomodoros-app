Feature: Authentication redirect
  Validate Supertokens force authentication when user visits page
  Scenario: Force user to auth
  Given User visits Pomodoros Home
  When User is unauthenticated
  Then Is redirected to auth service
  
  