Feature: Show loading component while request stages data is ended
    Scenario: User views loading component while request stages data
        When user requests project stages
        Then Show a loading component while request ends