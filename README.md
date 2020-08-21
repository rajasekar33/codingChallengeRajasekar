Login id to test this application 

email - test@gmail.com
password - Test@123

Here is the sample user object 

 {
        name: "raja",
        email: "test@gmail.com",
        password: "Test@123",
        account: [
            { bank: "hdfc", balance: 100 }
        ]
    }

User will be redirected to Dashboard page where we have option to withdraw money from the respective bank. 
I have put some basic validations there 

user should have an account in the bank to withdraw, 
they cant withdray if the amount entered is greater than the balance 