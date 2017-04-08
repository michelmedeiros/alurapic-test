Feature: Use functions in the Alurapic main page

    Scenario: Filter animals in the main page
        Given I go to "http://localhost:3030/"
        When I add "Cachorro" in the search field
        Then I should see results in the list
        And I should see result graphic payment: "Antecipe agora esse faturamento e negocie um desconto com seu fornecedor!"