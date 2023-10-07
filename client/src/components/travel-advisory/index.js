import React, { useEffect, useState } from 'react';

function TravelAdvisoryComponent() {
  const [advisoryData, setAdvisoryData] = useState(null);
  const countryCode = "US"; // You can change this to any valid country code or make it dynamic

  useEffect(() => {
    const apiUrl = `https://www.travel-advisory.info/api?countrycode=${countryCode}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.data && data.data[countryCode]) {
          setAdvisoryData(data.data[countryCode].advisory); // Adjusting based on the response structure
        }
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []); // The empty dependency array means this useEffect runs once when the component mounts

  return (
    <div>
      {advisoryData ? (
        <div>
          {/* Render your advisory data here */}
          <p>Country: {countryCode}</p>
          <p>Advisory Score: {advisoryData.score}</p>
          <p>Message: {advisoryData.message}</p>
          <p>Updated: {advisoryData.updated}</p>
        </div>
      ) : (
        <p>Loading advisory data...</p>
      )}
    </div>
  );
}

export default TravelAdvisoryComponent;
