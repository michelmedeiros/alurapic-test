Feature: Use functions in the Alurapic main page
    @Automatizar
    Scenario: Filter animals in the main page
        Given I go to "https://cdc-alurapic.herokuapp.com/"
        When I add "Cachorro" in the search field
        Then I should see results in the list
      