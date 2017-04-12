Feature: Use functions in the Alurapic main page
    @Automatizar
    Scenario: Filter animals in the main page
        Given I go to "https://cdc-alurapic.herokuapp.com/"
        And I go to no-angular "http://google.com.br"
        And I go to "github.com website"
        When I add "Cachorro" in the search field
        Then I should see results in the list
        #And I should see result graphic payment: "Antecipe agora esse faturamento e negocie um desconto com seu fornecedor!"