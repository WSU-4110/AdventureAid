const Vacation = require('../../server/middleware/index'); 

describe('Vacation - pushDestination', () => {
  let vacation;

  beforeEach(() => {
    vacation = new Vacation();
  });

  it('should add a valid destination', () => {
    vacation.pushDestination('Paris');
    expect(vacation.getAllDestinations()).toContain('Paris');
    expect(vacation.getNumOfDestinations()).toBe(1);
  });

  it('should throw an error for null input', () => {
    expect(() => vacation.pushDestination(null)).toThrow('Invalid destination');
  });

  it('should throw an error for non-string input', () => {
    expect(() => vacation.pushDestination(123)).toThrow('Invalid destination');
  });
});
