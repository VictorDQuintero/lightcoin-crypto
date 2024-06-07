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
      // loops through the array this.transaction and adds the value of transaction to the balance
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction); // pushes transaction object into this.transactions array
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return "Transaction not allowed!"; // commit does not go through
    } else {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this); // commit goes through and transaction gets pushed into account
      //as an example it calls t1.account.addTransaction() and puts the whole object (t1) in it. And because this.account is assigned myAccount it effectively calls myAccount.addTransaction(t1) // Clever!
      return "Transaction succesful!";
    }
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount; // returns a negative ammount to any new withdrawal object as tx.value
  }
  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount; // returns a positive ammount to any new deposit object as tx.value
  }
  isAllowed() {
    // Deposits are always allowed
    return true;
  }
}

// DRIVER CODE BELOW

const myAccount = new Account("Brit");

console.log("Starting Account Balance: ", myAccount.balance);

console.log("Attempting to withdraw even $1 should fail...");
const t1 = new Withdrawal(1.0, myAccount);
console.log("Commit result:", t1.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Depositing should succeed...");
const t2 = new Deposit(9.99, myAccount);
console.log("Commit result:", t2.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Withdrawal for 9.99 should be allowed...");
const t3 = new Withdrawal(9.99, myAccount);
console.log("Commit result:", t3.commit());

console.log("Ending Account Balance: ", myAccount.balance);
console.log("Lookings like I'm broke again");

console.log("Account Transaction History: ", myAccount.transactions);
