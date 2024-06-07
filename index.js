class Account {
  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    //as an example it calls t1.account.addTransaction() and puts the whole object (t1) in it. And because this.account is assigned myAccount it effectively calls myAccount.addTransaction(t1) // Clever!
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount; // returns a negative ammount to any new withdrawal object as tx.value
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount; // returns a positive ammount to any new deposit object as tx.value
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("billybob");

console.log("Starting Balance:", myAccount.balance);

const t1 = new Deposit(120.0, myAccount);
console.log(t1.value);
console.log(t1);
t1.commit();

console.log(myAccount.transactions);
console.log(myAccount.balance);

const t2 = new Withdrawal(50.0, myAccount);
console.log(t2.value);
console.log(t2);
t2.commit();
console.log(myAccount.transactions);
console.log(myAccount.balance);

console.log("Ending Balance:", myAccount.balance);
