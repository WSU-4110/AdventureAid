const Vacation = require('../../server/middleware/index'); 

describe('Vacation - removeDestination', () => {
  let vacation;

  beforeEach(() => {
    vacation = new Vacation();
    vacation.pushDestination('London');
    vacation.pushDestination('Tokyo');
  });

  it('should remove an existing destination', () => {
    vacation.removeDestination('London');
    expect(vacation.getAllDestinations()).not.toContain('London');
    expect(vacation.getNumOfDestinations()).toBe(1);
  });

  it('should throw an error when destinations array is empty', () => {
    vacation.removeAllDestinations();
    expect(() => vacation.removeDestination('Tokyo')).toThrow('Destinations array is already empty');
  });

  it('should throw an error for null input', () => {
    expect(() => vacation.removeDestination(null)).toThrow('Invalid destination');
  });

  it('should throw an error for non-string input', () => {
    expect(() => vacation.removeDestination(123)).toThrow('Invalid destination');
  });
});
