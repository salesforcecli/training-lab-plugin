// A simple Apex class that returns 10 Account records.
public class GetAccounts {

    // Get 10 Account records.
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account LIMIT 10];
    }

    // Get 10 Account records with a specific name.
    public static List<Account> getAccounts(String name) {
        return [SELECT Id, Name FROM Account WHERE Name = :name LIMIT 10];
    }    
}