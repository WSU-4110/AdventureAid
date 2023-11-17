
export const vacationOperations = {
    addDestination: async function(destination) {
        try {
            const response = await fetch('http://localhost:3001/push-destination', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destination }),
            });
            if (response.ok) {
                console.log('Destination added');
                alert('ur good');
            } else {
                console.error('Failed to add destination');
                alert('erro1')
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