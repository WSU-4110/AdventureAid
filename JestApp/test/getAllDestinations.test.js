const Vacation = require('../../server/middleware/index'); 

describe('Vacation - getAllDestinations', () => {
  let vacation;

  beforeEach(() => {
    vacation = new Vacation();
  });

  it('should return all destinations', () => {
    vacation.pushDestination('Sydney');
    expect(vacation.getAllDestinations()).toEqual(['Sydney']);
  });
});
