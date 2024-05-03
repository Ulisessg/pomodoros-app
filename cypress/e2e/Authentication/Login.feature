Feature: Login
  Scenario: Authentication flow
  Given User visits Pomodoros Home without authentication
  When User is in auth page
  Then User can access page