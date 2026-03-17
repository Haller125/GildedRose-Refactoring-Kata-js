const { Cashier } = require('../src/cashier');
const { Item } = require('../src/gilded_rose');

describe('TestCalculateChange', () => {
  test('test_calculate_change_exact_amount', () => {
    const cashier = new Cashier();
    const change = cashier.calculateChange(10, 10);
    expect(change).toEqual([]);
  });

  test('test_calculate_change_overpaid', () => {
    const cashier = new Cashier();
    const change = cashier.calculateChange(20, 7);
    expect(change).toEqual([10, 1, 1, 1]);
  });

  test('test_calculate_change_one_coin', () => {
    const cashier = new Cashier();
    const change = cashier.calculateChange(15, 10);
    expect(change).toEqual([5]);
  });
});

describe('TestBudgetOptionsMaxTwoItems', () => {
  test('test_budget_options_two_item_combinations', () => {
    const cashier = new Cashier();
    const items = [
      new Item('apple', 10, 5),
      new Item('banana', 10, 5),
      new Item('orange', 10, 5)
    ];
    const budget = 10;
    const combinations = cashier.budgetOptions(budget, items);

    expect(combinations.length).toBe(3);
    expect(combinations.every(combo => Array.isArray(combo))).toBe(true);
    for (const combo of combinations) {
      const total = combo.reduce((sum, item) => sum + item.quality, 0);
      expect(total).toBe(budget);
    }
  });
});

describe('TestBudgetOptionsMaxThreeItems', () => {
  test('test_budget_options_three_item_combinations', () => {
    const cashier = new Cashier();
    const items = [
      new Item('item_1', 10, 3),
      new Item('item_2', 10, 3),
      new Item('item_3', 10, 3),
      new Item('item_4', 10, 3)
    ];
    const budget = 9;
    const combinations = cashier.budgetOptions(budget, items);

    expect(combinations.length).toBeGreaterThan(0);
    for (const combo of combinations) {
      expect(combo.length).toBe(3);
      const total = combo.reduce((sum, item) => sum + item.quality, 0);
      expect(total).toBe(budget);
    }
  });
});

describe('TestBudgetOptionsMaxFourItems', () => {
  test('test_budget_options_four_item_combinations', () => {
    const cashier = new Cashier();
    const items = [
      new Item('item_1', 10, 2),
      new Item('item_2', 10, 2),
      new Item('item_3', 10, 2),
      new Item('item_4', 10, 2),
      new Item('item_5', 10, 2)
    ];
    const budget = 8;
    const combinations = cashier.budgetOptions(budget, items);

    expect(combinations.length).toBeGreaterThan(0);
    for (const combo of combinations) {
      expect(combo.length).toBe(4);
      const total = combo.reduce((sum, item) => sum + item.quality, 0);
      expect(total).toBe(budget);
    }
  });
});

describe('TestBudgetOptionsMaxFiveOrMoreItems', () => {
  test('test_budget_options_five_plus_item_combinations', () => {
    const cashier = new Cashier();
    const items = [
      new Item('item_1', 10, 1),
      new Item('item_2', 10, 1),
      new Item('item_3', 10, 1),
      new Item('item_4', 10, 1),
      new Item('item_5', 10, 1),
      new Item('item_6', 10, 1)
    ];
    const budget = 6;
    const combinations = cashier.budgetOptions(budget, items);

    expect(combinations.length).toBeGreaterThan(0);
    for (const combo of combinations) {
      expect(combo.length).toBeGreaterThanOrEqual(5);
      const total = combo.reduce((sum, item) => sum + item.quality, 0);
      expect(total).toBe(budget);
    }
  });
});
