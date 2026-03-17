class Cashier {
  constructor() {
    this.coins = [1, 5, 10, 25, 50];
  }

  calculateChange(amountPaid, itemPrice) {
    throw new Error('NotImplementedError');
  }

  budgetOptions(budget, currentItems) {
    throw new Error('NotImplementedError');
  }
}

module.exports = {
  Cashier
};
