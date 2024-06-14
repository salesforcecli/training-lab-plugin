@isTest
public class GetAccountsTest {

    @isTest static void testGetAccounts() {
        // Setup test data
        // Create 10 Account records
        List<Account> accounts = new List<Account>();
        for(Integer i = 0; i < 10; i++) {
            accounts.add(new Account(Name = 'Test Account ' + i));
        }
        insert accounts;

        Test.startTest();
        List<Account> result = GetAccounts.getAccounts();
        Test.stopTest();

        // Assert that the method returns 10 records
        System.assertEquals(10, result.size());
    }

    @isTest static void testGetAccountsWithName() {
        // Setup test data
        // Create 10 Account records with the name 'Test Account'
        List<Account> accounts = new List<Account>();
        for(Integer i = 0; i < 10; i++) {
            accounts.add(new Account(Name = 'Test Account'));
        }
        insert accounts;

        Test.startTest();
        List<Account> result = GetAccounts.getAccounts('Test Account');
        Test.stopTest();

        // Assert that the method returns 10 records with the name 'Test Account'
        System.assertEquals(10, result.size());
        for(Account a : result) {
            System.assertEquals('Test Account', a.Name);
        }
    }
}