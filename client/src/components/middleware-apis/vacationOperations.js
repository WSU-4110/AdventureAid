
export const vacationOperations = {
    planVacation: async function(locality, startDate, endDate) {
        try {
            const response = await fetch('http://localhost:3001/start-planning-vacation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ locality, startDate, endDate }),
            });
            if (response.ok) {
                console.log('Vacation created');
                //alert('u good')
            } else {
                console.error('Failed to create vacation');
                //alert('error1')
            }
        } catch (error) {
            console.error('Error:', error);
            //alert('error2')
        }
    },
    getName: async function() {
        try {
            const response = await fetch('http://localhost:3001/get-vacation-name', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.vacationName;
          } catch (error) {
            console.error('Error fetching vacation name:', error);
            throw error;
          }
    },
    getLocality: async function() {
        try {
            const response = await fetch('http://localhost:3001/get-vacation-locality', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.vacationLocality;
          } catch (error) {
            console.error('Error fetching vacation locality:', error);
            throw error;
          }
    },
    getStartDate: async function() {
      try {
        const response = await fetch('http://localhost:3001/get-vacation-startdate', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.vacationStartDate;
      } catch (error) {
        console.error('Error fetching vacation start date:', error);
        throw error;
      }
    },
    getEndDate: async function() {
      try {
        const response = await fetch('http://localhost:3001/get-vacation-enddate', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.vacationEndDate;
      } catch (error) {
        console.error('Error fetching vacation end date:', error);
        throw error;
      }
    },
    createAndAddDestination: async function(name, address, date, coordinates) {
      try {
        const response = await fetch('http://localhost:3001/create-and-add-destination', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, address, date, coordinates }),
        });
        if (response.ok) {
            console.log('Destination added');
        } else {
            console.error('Failed to add destination');
            alert('error1')
        }
      } catch (error) {
          console.error('Error:', error);
          alert('error2')
      }
    },
    addDestination: async function(destination) {
        try {
            const response = await fetch('http://localhost:3001/push-destination', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destination }),
            });
            if (response.ok) {
                console.log('Destination added');
            } else {
                console.error('Failed to add destination');
                alert('error1')
            }
        } catch (error) {
            console.error('Error:', error);
            alert('error2')
        }
    },
    removeDestination: async function(destination) {
        try {
          const response = await fetch('http://localhost:3001/remove-destination', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ destination }),
          });
          if (response.ok) {
            console.log('Destination added');
          } else {
            console.error('Failed to add destination');
          }
        } catch (error) {
          console.error('Error:', error);
        }
    },
    removeAllDestinations: async function() {
        try {
            const response = await fetch('http://localhost:3001/remove-all-destinations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('All Destinations removed');
            } else {
                console.error('Failed to remove all destinations');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}